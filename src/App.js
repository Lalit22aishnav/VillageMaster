import { useState } from 'react';
import './css/comman.css';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Table ,Popconfirm,message} from 'antd';


function App() {
  
  const [Village, setVillageObj] = useState([]); //Handle Village List State
  const [isEdit,setEditVal] = useState(0); //Set isEdit 0/1 in case of edit/update
  const [EditKey,setEditKey] = useState(0); //Set isEdit 0/1 in case of edit/update
  const [form] = Form.useForm(); //Form hook use to set record in form and clear record of form


  //Validate The Dulicate Value 
  const isDublicate = (a,b) =>{
    const finalData = Village.filter((item) => item.ShortCode == a || item.VillName == b); 
    if(finalData.length === 0)
       return true
       else return false
  }

  //On Pass
  const onFinish = (values) => {
     if(isEdit === 0){  
                if(isDublicate(values.ShortCode,values.VillName))
                {
                  //Creating unic number ...
                  let unicNum = Math.floor((Math.random() * 1000) + 1);

                  //Creating Data Source for grid ...
                  let obj = {
                              key: unicNum,
                              ShortCode: values.ShortCode,
                              VillName: values.VillName,
                            }

                  //Set Village State ...
                  setVillageObj([...Village,obj]);
                  message.success('Record Added Successfully', 5);
                }else
                    {message.warn('Please Dont Enter Dublicate Record / Value ...', 5);}
      }else{
                const finalData = Village.filter((item) => item.key !== EditKey);
                let obj = { 
                            key: EditKey,
                            ShortCode: values.ShortCode,
                            VillName: values.VillName,
                          }
                setVillageObj([...finalData, obj]);
                message.success('Record Update Successfully', 5);
                setEditVal(0);
      }
      
      //Reset The Form...
      form.resetFields();
  };

  //On Error
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  //For Delete
  const handleDelete = (delKey) => {
      const finalData = Village.filter((item) => item.key !== delKey);
      setVillageObj(finalData);
      message.success('Record Delete Successfully', 5);
  }

  //Same For Edit
  const handleEdit = (EdtKey) => {  
    setEditKey(EdtKey);
    const getVillageObj = Village.filter((item) => item.key === EdtKey);
    form.setFieldsValue({
            ShortCode: getVillageObj[0].ShortCode,
            VillName: getVillageObj[0].VillName,
    });
    setEditVal(1);
}
  //Grid Column
  const columns = [
    {
      title: 'Short Code',
      dataIndex: 'ShortCode',
      key: 'ShortCode',
    },
    {
      title: 'Village Name',
      dataIndex: 'VillName',
      key: 'VillName',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: (_,record) =>
            Village.length >=1?
            <Popconfirm title="Sure to Edit?" onConfirm={() => handleEdit(record.key)}>
              <a>Edit</a>
            </Popconfirm>:null,  
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: (_,record) =>
            Village.length >=1?
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>:null,  
    },
  ];
  
  
  return (
            <div>
                  <div className="container  pd-0-15">
                    <h3 className="f-72"><i className="fa fa-home" aria-hidden="true"></i> Village Master</h3>
                  </div>  
                  <div className="pd-0-15 dF jC-SA">
                    <Form form={form}  className="loginContainer aI dF _justCenter _flex_d_C bx-sh formPadding"  name="basic"   initialValues={{ remember: false,}}  onFinish={onFinish}  onFinishFailed={onFinishFailed} >

                      <Form.Item name="ShortCode" rules={[ { required: true, message: 'Please input short code!',}, ]} >
                        <Input placeholder="Short Code"/>
                      </Form.Item>

                      <Form.Item  name="VillName" rules={[ { required: true,message: 'Please input village name!', }, ]} >
                      <Input placeholder="Village Name"/>
                      </Form.Item>

                      <Form.Item  name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>

                      <Form.Item className="a-right">
                              <Button type="primary" htmlType="submit">
                                    {isEdit == 0 ?"Submit":"Update"}
                              </Button>
                      </Form.Item>
                    </Form>
                    <Table dataSource={Village}  columns={columns} scroll={{ y: 170 }}/>;
                </div>    
            </div>
    
  );
}

export default App;