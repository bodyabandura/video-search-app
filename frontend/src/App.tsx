import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './lib/apollo';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import './App.css'

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
