import logo from '/hazy.svg'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Database } from '../shared/types';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

function App() {
  const queryClient = useQueryClient();

  const users = useQuery<PostgrestSingleResponse<Database['public']['Tables']['users']['Row'][]>>({
    queryKey: ['users'],
    queryFn: () => fetch(process.env.API_BASEURL + '/users').then((x) => x.json()),
  });

  const createUser = useMutation({
    mutationFn: (payload: Database['public']['Tables']['users']['Insert']) => fetch(process.env.API_BASEURL + '/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((x) => x.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id: number) => fetch(process.env.API_BASEURL + '/users/' + id, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((x) => x.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  });

  return (
    <>
      <img src={logo} className="logo" alt="Hazy logo" width="120" onClick={() => users.refetch()} />
      <ul>
        { users.isLoading && 'loading...' }
        { users.data?.data?.map?.((user) => (
          <li key={user.id}>
            { user.username } ({ user.password })
            <button
              disabled={deleteUser.isLoading}
              onClick={() => deleteUser.mutate(user.id)}
            >delete</button>
          </li>
        ))}
        <button
          disabled={createUser.isLoading}
          onClick={() => createUser.mutate({
            username: prompt('username') || '',
            password: prompt('password') || '',
          })}
        >add</button>
      </ul>
    </>
  )
}

export default App
