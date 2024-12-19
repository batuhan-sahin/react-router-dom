import { useLoaderData, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

interface UserParams {
  id: number;
  name: string;
  email: string;
}

interface Posts {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Albums {
  id: number;
  userId: number;
  title: string;
}
interface Todos {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const userDetailsLoader = async ({ params }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );
  const user = await response.json();
  return user;
};

function Details() {
  const user = useLoaderData() as UserParams;
  const [key, setKey] = useState("posts");
  const [data, setData] = useState<Posts[] | Albums[] | Todos[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = "";
        if (key === "posts") {
          url = `https://jsonplaceholder.typicode.com/users/${user.id}/posts`;
        } else if (key === "albums") {
          url = `https://jsonplaceholder.typicode.com/users/${user.id}/albums`;
        } else if (key === "todos") {
          url = `https://jsonplaceholder.typicode.com/users/${user.id}/todos`;
        }

        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(`Failed to fetch ${key}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key, user.id]);
  return (
    <>
      <h1>{user.name}</h1>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="posts" title="Posts">
          <ul>
            {loading ? (
              <p>Loading posts...</p>
            ) : (
              <ul>
                {(data as Post[]).map((post) => (
                  <li key={post.id}>
                    <h4>{post.title}</h4>
                    <p>{post.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </ul>
        </Tab>
        <Tab eventKey="albums" title="Albums">
          {loading ? (
            <p>Loading albums...</p>
          ) : (
            <ul>
              {(data as Album[]).map((album) => (
                <li key={album.id}>
                  <Link to={`/users/${user.id}/albums/${album.id}`}>
                    {album.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Tab>
        <Tab eventKey="todos" title="Todos">
          {loading ? (
            <p>Loading todos...</p>
          ) : (
            <ul>
              {(data as Todos[]).map((todo) => (
                <li key={todo.id}>
                  <h4>{todo.title}</h4>
                  <p>{todo.completed ? "Completed" : "Not completed"}</p>
                </li>
              ))}
            </ul>
          )}
        </Tab>
      </Tabs>
    </>
  );
}

export default Details;
