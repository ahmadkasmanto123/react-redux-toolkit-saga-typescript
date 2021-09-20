import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  decrement,
  increment,
  resetCount,
} from "../redux/reducers/counterSlice";
import { fetchPostRequest } from "../redux/reducers/postReducer";
import { Box, Button, Tile, TextCount} from "../styles/styles";

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const { data: dataPost, loading: isLoading } = useAppSelector(
    (state) => state.post
  );
  const [refresh, setrefresh] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchPostRequest({
        name: "Sabituddin Bigbang",
        callName: "Sabit Aja",
      })
    );
  }, [dispatch, refresh]);

  return (
    <Box>
      <div style={{ backgroundColor: "#fff888", padding: 20 }}>
        <TextCount>[ COUNTER REDUX TOOLKIT TYPSCRIPT EXAMPLE ]</TextCount>
        <h1 style= {{ fontSize: 100, padding: 0, margin: 8 }}>{count}</h1>
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        <Button onClick={() => dispatch(resetCount())}>Reset Value</Button>
      </div>
      <h1>[ REACT REDUX | TYPESCRIPT | REDUX-SAGA MIDDLEWARE | API FETCH BY AXIOS ]</h1>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Button
            onClick={() => {
              refresh ? setrefresh(false) : setrefresh(true);
            }}
          >
            Refresh
          </Button>
          <a href="https://jsonplaceholder.typicode.com/posts">API Example</a>
        </div>
      )}
      {dataPost.map((post) => (
        <div key={post.id}>
          <Tile>
            <h1>{post.title}</h1>
            <p style={{ fontSize: 20 }}>{post.body}</p>
          </Tile>
        </div>
      ))}
    </Box>
  );
};

export default Counter;
