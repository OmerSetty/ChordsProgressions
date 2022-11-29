import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetchData(url) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async function () {
      try {
        setLoading(true)
        const response = await axios.get(url, { withCredentials: true })
        setData(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, [url])

  return { data, error, loading }

} 