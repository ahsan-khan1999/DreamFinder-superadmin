/* eslint-disable */

import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@material-ui/lab/TreeView';
// import { TreeView } from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { Card, CardBody, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import AddRegionModal from './AddRegionModal';
import { useDispatch, useSelector } from 'react-redux';
import { ReadRegionAction } from 'Store/Actions/RegionClassification/regionClassificationAction';
import apiServices from 'services/requestHandler';
export default function RegionTreeView() {
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);
  const [area, setArea] = useState([])

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const dispatch = useDispatch();
  const readRegion = async () => {
    let res = await dispatch(ReadRegionAction());
  };
  const readArea = async(item) => {

    let res= await apiServices.readArea({parent_uid:item?.uid});
    console.log(res);
    setArea(res?.data?.response_data)
  }
  useEffect(() => {
    readRegion();
  }, []);

  const regionClassification = useSelector(
    (state) => state?.CreateRegionReducer?.region
  );
  
  console.log(regionClassification);
  let [show, setShow] = useState(false);
  let [hide, setHide] = useState(false);

  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? ['1', '5', '6', '7'] : []
    );
  };

  
  const handleSelectClick = () => {
    setSelected((oldSelected) =>
      oldSelected.length === 0
        ? ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        : []
    );
  };
  const addRegion = () => {};
  const editRegion = () => {};

  // const treeArray = [
  //   regionClassification?.map((item, index) => {
  //     if (item?.parent !== null) {
  //       <TreeItem nodeId={index} label={item?.category}>
  //         <TreeItem label={item?.parent?.category} />
  //       </TreeItem>;
  //     } else {
  //       <TreeItem nodeId={index} label={item?.category} />;
  //     }
  //   }),
  // ];
  const treeArray = [
    regionClassification?.map((item, index) => {
      if (item?.category === 'region') {
        <TreeItem nodeId={index} label={item?.category} />

      } else {

      }
    }),
  ];
  const getTreeItemsFromData = treeItems => {
    return treeItems?.map(treeItemData => {
      let children = "parent";
      if (treeItemData?.children !== null) {
        children = getTreeItemsFromData(treeItemData?.children);
        console.log(children,"at children");
        
      }
      return (
        <TreeItem
          key={treeItemData.uid}
          nodeId={treeItemData.uid}
          label={treeItemData.name}
          children={children}
          onClick={() => readArea(treeItemData)}
        >
          {area.map((item) => (
            <TreeItem 
            key={item?.uid}
            nodeId={item?.uid}
            label={item?.name}

            />
          ))}
          </TreeItem>
      );
    });
  };
  return (
    <>
      <Card>
        <CardBody>
          <Row>
            <Colxx xxs="12">
              <h4>Region Classification</h4>

              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Box
            sx={{ height: 270, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
          >
            <Box sx={{ mb: 1 }}>
              <Button onClick={showModal}>Add Region</Button>
            </Box>
            <TreeView
              aria-label="controlled"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              expanded={expanded}
              selected={selected}
              onNodeToggle={handleToggle}
              onNodeSelect={handleSelect}
              multiSelect
            >
                {getTreeItemsFromData(regionClassification)}

      

              
              {/* <TreeItem nodeId="5" label="Region">
          <TreeItem nodeId="6" label="Area">
            <TreeItem nodeId="7" label="Area 1" />
            <TreeItem nodeId="8" label="Area 2">
              <TreeItem nodeId="9" label="Thana1" >
              <TreeItem nodeId="10" label="Teritory" >
              <TreeItem nodeId="11" label="Market" />

              </TreeItem>

              </TreeItem>

              
            </TreeItem>
            
          </TreeItem>
        </TreeItem> */}
            </TreeView>
          </Box>
        </CardBody>
      </Card>
      <AddRegionModal show={show} handleClose={hideModal} />
    </>
  );
}

// {regionClassification?.map((item, index) => {
//   console.log(item);
//   item?.category === 'region' ? (
//     <>
//       <Button onClick={addRegion}>Add</Button>
//       <Button onClick={editRegion}>Edit</Button>
//     </>
//   ) : (
//     <>
{
  /* <TreeItem nodeId="1" label={regionClassification?.map((item,index) => item?.category === 'region' ? item?.category : '')}> */
}

//     </>
//   );
// })}
