import React, { useEffect, useState } from "react";

const useFetch = (fetch, filter) => {
  const [loading, setLoading] = useState(false);
  const [data, setDate] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch
      .list(filter)
      .then((response) => {
        if (response) {
          setDate(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories :", error);
        setLoading(false);
      });
  }, []);

  return { data, loading };
};

export default useFetch;
