// GridComponent.js

import Grid from "@mui/material/Grid";

const GridComponent = ({ data }: any) => {
  return (
    <Grid container spacing={2}>
      {data.map((item: any) => (
        <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
          <img
            src={`https://test.create.diagnal.com/images/${item['poster-image']}`}
            alt={item.name}
            style={{ width: "100%", borderRadius: "5px" }}
          />
          <div style={{ color: "#FFF"}}>{item.name}</div>
        </Grid>
      ))}
    </Grid>
  );
};

export default GridComponent;
