import { useFavorites } from "../FavoritesContext";
import Button from "react-bootstrap/Button";
function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div>
      <h1>Favorite Photos</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {favorites.map((photo) => (
            <div
              key={photo.id}
              style={{
                width: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                style={{ width: "100%", borderRadius: "5px" }}
              />
              <p>{photo.title}</p>

              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromFavorites(photo.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
