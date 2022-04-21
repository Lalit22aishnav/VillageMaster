import '../css/main.css';
import { Empty,Tooltip } from 'antd';

function GridComponent (props){

    const handleEdit = (KEY) =>{ props.handleEdit(KEY);}

    const handleDelete = (KEY) =>{ props.handleDelete(KEY);}


    const TableGrid = () =>{
            return( 
                    <table className="table_V" cellSpacing="0px"> 
                            <TableHead/>
                            <TableBody/>
                    </table>
            )
    }
    const TableHead = () => {
            return(
                    <thead className="tableCol_V">
                        <tr>
                                    {props.column.map(
                                        (itm)=>{    
                                                    return(<th style={{width:itm.width}}>{itm.name}</th>)
                                                }
                                    )}
                        </tr>
                    </thead>
            )
    }
    const TableBody = () =>{
            return(
                    <tbody className="tableBody_V">

                        {

                                (props.dataSource.length === 0)
                                ?<tr><td colspan="3" align="center"><Empty /></td></tr>
                                :props.dataSource.map(
                                        (itm)=>{    
                                        return(
                                                        <tr>
                                                        <td>{itm.ShortCode}</td>
                                                        <td>{itm.VillName}</td>
                                                        <td className="fx">
                                                                <Tooltip title="For Edit">
                                                                        <span className="tools pColor" onClick={() => handleEdit(itm.key)}>Edit</span>
                                                                </Tooltip>&nbsp;
                                                                <Tooltip title="Are you sure to delete">
                                                                        <span className="tools bColor" onClick={() => handleDelete(itm.key)}>Delete</span>
                                                                </Tooltip>
                                                        </td>
                                                        </tr>
                                                )
                                        }
                                )
                        }
                    </tbody>
            )
    }
    return (
        <div class="table_container">
                        <TableGrid/>
        </div>   
    );
}

export default GridComponent;
