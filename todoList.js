import { Button, Input, Form, List } from 'antd';
import React, { useEffect, useState } from 'react';
import './todo.css';

const {TextArea} = Input;
const TodoList = () => {
    const [form] = Form.useForm();
    const [postList, setPostList] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({title: '', content: ''});
    const [selectedIndex, setSelectedIndex] = useState(null);
const handleSubmit= (value) => {
    if(selectedIndex !== null) {
        let updatedList = [...postList];
        updatedList[selectedIndex] = {...formData, ...value};
        setPostList(updatedList);
        localStorage.setItem('todo', JSON.stringify(updatedList));
        setFormVisible(false);
        selectedIndex(null);
        setFormData({title: '', content: ''});
        form.setFieldsValue({title: '', content: ''});
    } else {
        const newPost = {...formData, ...value};
        setPostList([...postList, newPost]);
        localStorage.setItem('todo', JSON.stringify([...postList, newPost]));
        setFormData({title: '', content: ''});
        setFormVisible(false);
        form.setFieldsValue({title: '', content: ''});
    }
}
const handleInputChange = (event)=> {
    setFormData({...formData, [event.target.name]: event.target.value});
}

const handleEdit = (i)=>{
    form.setFieldsValue(postList[i]);
    setFormData(postList[i]);
    setSelectedIndex(i);
    setFormVisible(true);
}

const handleDelete = (i) =>{
    const updatedList =  postList.filter((val, index) => i !== index);
    setPostList(updatedList);
    localStorage.setItem('todo', JSON.stringify(updatedList));
}
useEffect(()=>{
    const getList = localStorage.getItem('todo');

    
    if(getList) {
        const list = JSON.parse(getList)
        console.log("getList", list);

        setPostList(list)
    }
}, []);

console.log("selext", selectedIndex);

  return (
    <div className='post-main-cotainer'>
        <h1>Todo List</h1>
        <div>
            {!formVisible && (
                <Button type='primary' onClick={()=>setFormVisible(true)}>
                create New list
            </Button>
            )}
            {formVisible && (
                <Form form={form} className='form-tag' onFinish={handleSubmit}>
                    
                    <Form.Item 
                    lable='Title'
                    name='title'
                    initialValues={formData}
                    >
                        <Input initialValue={formData.title} name='title' placeholder='Enter the Title Name' onChange={handleInputChange}/>
                    </Form.Item>
                    <Form.Item 
                    lable='Content'
                    name='content'
                    >
                        <TextArea initialValue={formData.content} rows={4} name='content' placeholder='Enter the content' onChange={handleInputChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                               {selectedIndex === null ? 'Add Post' : "Update post"}
                        </Button>
                    </Form.Item>
                </Form>
            )}
            <h1>List</h1>
              <List
                  dataSource={postList}
                  renderItem={(item, index) => (
                      <List.Item
                          actions={[
                              <Button onClick={()=>handleEdit(index)} type='link'>Edit</Button>,
                              <Button onClick={()=>handleDelete(index)} type='link' danger>Delete</Button>
                          ]}>
                          <h3>{item.title}</h3>
                          <p>{item.content}</p>
                      </List.Item>
                  )
                  } />
        </div>
    </div>
  )
}

export default TodoList