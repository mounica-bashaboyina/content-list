// App.js

import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import GridComponent from './GridComponent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#171717', 
    },
  },
});

const fetchData = async (page) => {
  const response = await fetch(`https://test.create.diagnal.com/data/page${page}.json`);
  return response.json();
};

function App() {
  const [pageData, setPageData] = useState([]);
  const [pageTitle, setPageTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadMoreData = async () => {
    try {
      const nextPageData = await fetchData(currentPage + 1);
      setPageData((prevData) => [...prevData, ...nextPageData.page['content-items'].content]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error loading more data:', error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage)
      .then((data) => {
        setPageTitle(data.page.title);
        setPageData((prevData) => [...prevData, ...data.page['content-items'].content]);
      })
      .catch(() => {
        setHasMore(false);
      });
  }, [currentPage]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = pageData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <Box mt={4} mb={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" component="div" style={{ color: '#FFFFFF' }}>
            {pageTitle}
          </Typography>
          <TextField
         
            InputProps={{
              style: { color: '#FFFFFF' },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: '#FFFFFF' }} />
                </InputAdornment>
              ),
            }}
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
        <InfiniteScroll
          dataLength={filteredData.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <GridComponent data={filteredData} />
        </InfiniteScroll>
      </Container>
    </ThemeProvider>
  );
}

export default App;