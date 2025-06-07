import { useEffect, useState } from 'react';
import axios from 'axios';

export function useLatestGithubTag(owner: string, repo: string) {
  const [tag, setTag] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`https://api.github.com/repos/${owner}/${repo}/tags`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setTag(res.data[0].name);
        }
      })
      .catch(() => setTag(null));
  }, [owner, repo]);

  return tag;
}