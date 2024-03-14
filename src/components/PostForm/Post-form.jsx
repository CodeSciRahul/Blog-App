import React,{useCallback,useEffect} from 'react'
import { appendErrors, useForm } from 'react-hook-form'
import {Button,Logo,Input, RTE} from '../index'
import postservice from '../../Post/conf'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Postform({post}) {
    const {register, handleSubmit, watch, setValue,control,getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || '',
            content: post?.content || "",
            status: post?.status||"active",
        }
    })

    const Navigate = useNavigate();
    const userdata = useSelector(state=>state.auth.userdata)

    const submit = async(data)=>{
        if(post)
        {
           const file=data.image[0]? postservice.UploadFile(data.image[0]):null

           if(file)
           {
            postservice.DeleteFile(post.featuredImage)
           }
           const dbpost = await postservice.UpdatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined,

            if(dbpost) {
                Navigate(`/post/${dbpost.$id}`)
            }

           })
        }

        else{
            const file = await postservice.UploadFile(data.image[0])

            if(file){
              const fileid=file.$id
              data.featuredImage = fileid;
            const dbpost=await postservice.CreatePost({
                ...data,
                userId: userdata.$id
              })
              if(dbpost) {
                Navigate(`/post/${dbpost.$id}`)
              }
            }
        }
    }

    const slugTransform = useCallback((value) =>{
        if(value && typeof value === 'string')
        {
            return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g, '-')
        }
        return ""
    },[])

    useEffect(() => {
        const subscription = watch((value, {name})=>{
            if(name === 'title')
            {
                setValue('slug', slugTransform(value.title,{shouldValidate: true}))
            }
        })
        
        return ()=>{
            subscription.unsubscribe()
        }
    },[watch, slugTransform, setValue])
  return (
    <form onSubmit={{handleSubmit}} className='flex flex-wrap'>
        <div className='w-2/3 px-2'>
            <Input
             label="title: "
             placeholder = "Title"
             className="mb-4"
             {...register("title", {required:true})}  
            />

            <Input
            label="slug: "
            placeholder="slug"
            className="mb-4"
            {...register("slug", {required: true})}
            onInput={(e)=>{
                setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true});
            }}
            />
            <RTE
            name = "content"
            label = "Content: "
            control={control}
            defaultValue={getValues("content")}
            />
        </div>
        <div className='w-1/3 px-2'>
            <Input
            label = "Featured Image : "
            type='file'
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", {required: !post})}
            />

            {post && (
                <div className='w-full mb-4'>
                    <img 
                    src={postservice.PreviewFile(post.featuredImage)}
                    alt={post.title}
                    className='rounded-lg'
                    />
                </div>
            )}

            <Select
            options={['active', 'inactive']}
            label="status"
            className="mb-4"
            {...register("status", {required: true})}
            />

            <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className='w-full'>
            {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  )
}

export default Postform