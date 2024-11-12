import React, { useEffect, useState } from "react";
import axios from "axios";

// Kullanıcı verisi için tip
interface User {
  id: number;
  name: string;
  score: number;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // API'den verileri almak için useEffect kullanıyoruz
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/users/");
        setUsers(response.data); // Veriyi state'e kaydediyoruz
      } catch (err) {
        setError("Error fetching users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Yükleniyor mesajı
  if (loading) return <div>Loading...</div>;

  // Hata durumunda mesaj göster
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>  {/* Her öğeye benzersiz bir key ekledik */}
            {user.name} - {user.score}
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default UsersList;
