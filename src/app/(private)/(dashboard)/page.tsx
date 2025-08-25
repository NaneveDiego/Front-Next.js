import { cookies } from 'next/headers'
import Link from 'next/link'
import { DeleteButton } from '@/app/Components/DeleteButton'
import { Post } from '@/types/post'

export default async function Dashboard() {

  const cookieStore = (await cookies()).get('token')

  if (!cookieStore) {
    return 'erro no token'
  }
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
    headers: {
      'Authorization': `Bearer ${cookieStore.value}`,
      'Content-Type': 'application/json'
    }
  }
  )


  const posts: Post[] = await data.json()


  return (
    <>
      <div className=' flex flex-col items-center justify-center'>

        <p>posts</p>

        <Link href='/create' className='p-4 m-2 bg-blue-950 cursor-pointer'>Postar
        </Link>



        <div className='p-3  flex flex-col w-4/12'>
          {posts.map((post: Post) => (

            <div className='mb-3  bg-blue-700' key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p >{post.tags}</p>

              <div>
                <Link href={`/edit/${post._id}`} className='bg-fuchsia-600 cursor-pointer'>Editar </Link>
                <DeleteButton post={post._id} token={cookieStore.value}></DeleteButton>


              </div>

            </div>


          ))}
        </div>
      </div>
    </>
  );
}
