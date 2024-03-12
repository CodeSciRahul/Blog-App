import React,{useCallback,useEffect} from 'react'
import { useForm } from 'react-hook-form'
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
    <div>Post-form</div>
  )
}

export default Postform