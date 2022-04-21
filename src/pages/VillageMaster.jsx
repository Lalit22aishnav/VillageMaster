import { useState } from 'react';
import '../css/comman.css';
import { Row, Col,message} from 'antd';
import GridComponent from '../componets/GridComponet'

const style = {padding: '8px 0' ,color:'white'};

function VillageMaster()
{
    
    const [ShortName, setShortName] = useState("");
    const [VillageName, setVillageName] = useState("");
    const [Error,setError] = useState("");
    const [Village, setVillageObj] = useState([]); //Handle Village List State
    const [isEdit,setEditVal] = useState(0); //Set isEdit 0/1 in case of edit/update
    const [EditKey,setEditKey] = useState(0); //Set isEdit 0/1 in case of edit/update

    const setPropsOfVillage = (e) =>{

        if(e.target.name === "ShortName")
            setShortName(e.target.value);
        else
            setVillageName(e.target.value);
    }

    //Validate The Dulicate Value
    const isValidate = (a,b) =>{

        let isError = 0;

        if(ShortName === ""){
            setError("Short Name Is Empty ...")
            isError = 1;
        }
        if(VillageName === "" && isError === 0 ){
            setError("Village Name Is Empty ...")
            isError = 1;
        }

        if((ShortName !="" && VillageName!="") && isError === 0){
                const finalData = Village.filter((item) => item.ShortCode == a || item.VillName == b); 
                if(finalData.length !== 0) isError = 1; 
                setError("No Dulicate Value Allow To Insert ...")
        }

        if(isError === 1) 
            return false
        else    
            return true

    }

    const savePropsOfVillage = () =>{
        
        if(isEdit === 0){ 
                    if(isValidate(ShortName,VillageName))
                    {
                    //Creating unic number ...
                    let unicNum = Math.floor((Math.random() * 1000) + 1);

                    //Creating Data Source for grid ...
                    let obj = {
                                key: unicNum,
                                ShortCode: ShortName,
                                VillName: VillageName,
                                }
                    //Set Village State ...
                    setVillageObj([...Village,obj]);

                    //Clear IT
                    setShortName("");
                    setVillageName("");            

                    message.success('Record Added Successfully', 5);
                    }else
                        {message.warn(Error, 5);}
        }else{
                    const finalData = Village.filter((item) => item.key !== EditKey);
                    let obj = { 
                                key: EditKey,
                                ShortCode: ShortName,
                                VillName: VillageName,
                            }
                    setVillageObj([...finalData, obj]);

                    //Clear IT
                    setShortName("");
                    setVillageName("");

                    message.success('Record Update Successfully', 5);
                    setEditVal(0);
        }
    }

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

    //required to set feild...
    setShortName(getVillageObj[0].ShortCode);
    setVillageName(getVillageObj[0].VillName);

    setEditVal(1);
    }

    const columnObj = [
                        {name:'Short Code',width:'120px'},
                        {name:'Name',width:'200px'},
                        {name:'Action',width:'150px'},
                      ];

    return(

        <div>
                  <div className="container  pd-0-15">
                    <h3 className="f-72"><i className="fa fa-home" aria-hidden="true"></i> Village Master</h3>
                  </div>  
                  <div className="pd-0-15 dF jC-SA">
                        <div className="loginContainer aI dF _justCenter _flex_d_C bx-sh">
                                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                <Col className="gutter-row" span={12}>
                                                    <div style={style}>Short Code</div>
                                                </Col>
                                                <Col className="gutter-row" span={12}>
                                                    <div style={style}><input type="text" name="ShortName" value={ShortName}  onChange={setPropsOfVillage} /></div>
                                                </Col>
                                    </Row>
                                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                <Col className="gutter-row" span={12}>
                                                    <div style={style}>Village Name</div>
                                                </Col>
                                                <Col className="gutter-row" span={12}>
                                                    <div style={style}><input type="text" name="VillageName" value={VillageName} onChange={setPropsOfVillage} /></div>
                                                </Col>
                                    </Row>
                                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                <Col className="gutter-row" span={24}>
                                                    <div style={style}> 
                                                        <button class="btn-primary" type="primary" onClick={savePropsOfVillage}>
                                                            {isEdit == 0 ?"Submit":"Update"}
                                                        </button>
                                                    </div>
                                                </Col>
                                    </Row>
                        </div>
                        <GridComponent  column={columnObj} 
                                        dataSource={Village} 
                                        handleEdit={(EdtKey) => handleEdit(EdtKey)}
                                        handleDelete={(delKey) => handleDelete(delKey)}/>
                    </div>
                   
            </div>


    );
}

export default VillageMaster;
