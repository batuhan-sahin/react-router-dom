import { useLoaderData, Link } from "react-router-dom";
import { useFavorites } from "../FavoritesContext";
import Button from "react-bootstrap/Button";
interface Album {
  id: number;
  title: string;
}

interface Photo {
  id: number;
  title: string;
  thumbnailUrl: string;
}

interface User {
  id: number;
  name: string;
  username: string;
}

export const albumDetailsLoader = async ({ params }: any) => {
  const { userId, albumId } = params;

  const albumResponse = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}`
  );
  const album = await albumResponse.json();

  const photosResponse = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
  );
  const photos = await photosResponse.json();

  const userResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const user = await userResponse.json();

  return { album, photos, user };
};

function AlbumDetails() {
  const { album, photos, user } = useLoaderData() as {
    album: Album;
    photos: Photo[];
    user: User;
  };
  const { addToFavorites } = useFavorites();

  return (
    <div>
      <h1>{album.title}</h1>
      <p>
        <Link to={`/users/${user.id}`}>Back to User</Link>
      </p>
      <h2>Photos</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{
              width: "150px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "center",
              marginBottom: "5px",
            }}
          >
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              style={{ width: "100%", borderRadius: "5px" }}
            />
            <p>{photo.title}</p>
            <Button
              onClick={() =>
                addToFavorites({
                  id: photo.id,
                  title: photo.title,
                  thumbnailUrl: photo.thumbnailUrl,
                  userId: user.id,
                })
              }
              variant="primary"
              size="sm"
            >
              Add To Favorites
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumDetails;
