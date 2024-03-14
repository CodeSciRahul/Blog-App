import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Container } from '../components'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import PostService from '../Post/conf'
import parse from 'html-react-parser'
import { UseSelector, useSelector } from 'react-redux'


function Post() {
    const [Post, setPost] = useState(null)
    const { slug } = useParams();
    const navigate = useNavigate();
    const userdata = useSelector(state => state.auth.userdata)

    const isAuthor = Post && userdata ? Post.userId === userdata.$id : false

    useEffect(() => {
        if (slug) {
            PostService.GetPost(slug).then((post) => {
                if (post) setPost(post)
                else navigate('/')
            })
        }
        else { navigate('/') }
    }, [slug, navigate])

    const deletePost = () => {
        PostService.DeletePost(Post.$id).then((status) => {
            if (status) {
                PostService.DeleteFile(Post.featuredImage);
                navigate('/');
            }
        })
    }
    return Post ? (
        <div className='py-8'>
            <Container>
                <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                    <img
                        src={PostService.PreviewFile(Post.featuredImage)}
                        alt={Post.title}
                        className='rounded-xl'
                    />
                    {isAuthor && (
                        <div className='absolute right-6 top-6'>
                            <Link
                                to={`/edit-post/${Post.$id}`}
                            >
                                <Button
                                    bgColor='bg-red-500'
                                    onClick={deletePost}
                                >
                                    Delete
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                <div className='w-full mb-6'>
                    <h1 className='text-2xl font-bold'>
                        {Post.title}
                    </h1>
                </div>
                <div className='browser-css'>
                    {parse(Post.content)}
                </div>
            </Container>
        </div>
    ) : null
}

export default Post