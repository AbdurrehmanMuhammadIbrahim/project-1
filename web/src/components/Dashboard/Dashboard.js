import axios from 'axios';
import Post from "./post"
import { useState, useEffect, useRef } from "react"
import { baseurl } from "./../../core"
import { GlobalContext } from './../../context/Context';
import { useContext } from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useFormik  } from 'formik';
import * as Yup from 'yup';
// import Stack from '@mui/material/Stack';

// import Button from "@mui/material/Button";
// import { TextField } from '@mui/material';
const PostSchema = Yup.object({
   post: Yup
    .string('Enter your First Name')
      .min(3, 'Too Short!')
      .max(100, 'Too Long!'),
    //   .required('Enter your name'),
    description: Yup
    .string()
      .min(3, 'Too Short!')
      .max(20, 'Too Long!'),
    //   .required('Enter your LastName'),
    });


    
function Dashboard() {
    const [inputText, setInputText] = useState(""
            // post: '',
            // description: '',
    );
    let { state, dispatch } = useContext(GlobalContext);

    const [posts, setPosts] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [isMore, setIsMore] = useState(true)

    useEffect(() => {
        axios.get(`${baseurl}/api/v1/posts?page=0`, {
            withCredentials: true
        })
            .then((res) => {
                console.log("res +++: ", res.data);
                setPosts(res.data)
            })
    }, [refresh])

    const loadMore = () => {
        axios.get(`${baseurl}/api/v1/posts?page=${posts.length}`,
            {
                withCredentials: true
            })
            .then((res) => {
                console.log("res +++: ", res.data);
                if (res.data?.length) {
                    const newPosts = [...posts, ...res.data]
                    setPosts(newPosts)
                } else {
                    setIsMore(false)
                }
            })
    }


    const submit = () => {
        if (inputText !== "") {
            axios.post(`${baseurl}/api/v1/post`, {
                postText: inputText,
               description: inputText,
            }, {
                withCredentials: true
            })
                .then((res) => {
                    console.log("res: ", res.data);
                    setRefresh(!refresh)
                    alert("post created");

                })
        }
    }
    const formik = useFormik({
        validationSchema: PostSchema,
        initialValues: {
       
          post: '',
          description:'',
        
         
        },
        onSubmit: submit
      },
      );

    return (
        <div>
        <div className="form"> 
        <div className="main">
          <form onSubmit={formik.handleSubmit}>

          <h1>Post</h1>
          <Stack spacing={2}>
 <TextField
     fullWidth
     className="text"
     color="secondary"

     id=" post"
     name="post"
     label="what's in your mind"
     value={inputText}
     onChange={(e)=>{
         setInputText(e.target.value)
     }}
     error={formik.touched.post && Boolean(formik.errors.post)}
     helperText={formik.touched.post && formik.errors.post}
   />
 {/* <TextField
     fullWidth
     className="text"
     color="secondary"
     id="description"
     name="description"
     label="description"
     value={inputText}
     onChange={(e)=>{
        setInputText(e.target.value)
    }}
     error={formik.touched.description && Boolean(formik.errors.description)}
     helperText={formik.touched.description && formik.errors.description}
   /> */}
<Button color="secondary" variant="contained" fullWidth type="submit">
     Submit
   </Button>
</Stack>
        </form>
        </div>
        </div>
            <br />

            {posts.map((eachPost) => (
                <Post name={eachPost.name} 
                email={eachPost.email} 
                text={eachPost.postText} 
                 description={eachPost.description} />
            ))}

            <br /><br/>

            {(isMore) ? <Button color="secondary" variant="contained" onClick={loadMore}>Load More</Button> : null}
            
          
        </div>
     
    );
}

export default Dashboard;



