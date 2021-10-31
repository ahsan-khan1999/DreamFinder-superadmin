/* eslint-disable */

import { React, useState, useEffect } from 'react';
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
import apiServices from 'services/requestHandler';
import {
  ReadRegionAction, UpdateRegionClassificationAction,
  // UpdateRegionClassificationAction,
} from 'Store/Actions/RegionClassification/regionClassificationAction';
import { useDispatch, useSelector } from 'react-redux';
import edit from '../../../assets/img/iconmonstr-pencil-9.svg';
import add from '../../../assets/img/iconmonstr-plus-2.svg';
import cancal from '../../../assets/img/iconmonstr-trash-can-1.svg';
import 'react-sortable-tree/style.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

// You can import the default tree with dnd context
import SortableTree, { defaultSearchMethod } from 'react-sortable-tree';
// import data from './data.json';
const status = [
  { id: 1, name: 'active' },
  { id: 2, name: 'inactive' },
];
import '../../../App.css';
import { NotificationManager } from 'components/common/react-notifications';
import Loader from 'react-loader-spinner';
import { confirmAlert } from 'react-confirm-alert';
export default function RegionTreeView({ history }) {
  let treeData = [];
  const [editField, setEditField] = useState('');

  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);
  const [area, setArea] = useState([]);
  const dispatch = useDispatch();
  const [node, setSelectedNode] = useState('');
  const readRegionClassification = async () => {
    let res = await dispatch(ReadRegionAction());
  };
  const readArea = async (item) => {
    let res = await apiServices.readArea({ parent_uid: item?.uid });
    // console.log(res);
    setArea(res?.data?.response_data);
  };

  const regions = useSelector((state) => state?.CreateRegionReducer?.region);
  const loading = useSelector((state) => state?.CreateRegionReducer?.loading);
  // console.log(regions, 'tree view');
  console.log(regions,"data");
  // const [newData, setnewData] = useState([]);
  let newdata = [];
  const [data, setData] = useState(regions);
  useEffect(() => {
    readRegionClassification();
  }, []);

  // let myData =Object.values(regions)
  // console.log(myData,"mydata");

  // useEffect(() => {
  //   newdata = {...regions};
  // }, [newdata]);
  // console.log(newdata, 'new data');

  useEffect(() => {
    setData(regions);
  }, [regions]);
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };
  let [action, setAction] = useState('');
  let [show, setShow] = useState(false);
  let [cat, setCat] = useState();

  let [hide, setHide] = useState(false);
  const [header, setHeader] = useState('');
  const [id, setID] = useState('');

  const [name, setName] = useState('');

  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  const addRegion = () => {
    setEditField('');

    setHeader('Add Region');

    showModal();
  };
  const addArea = (title, id) => {
    setEditField('');

    setAction('');
    setHeader(`Add ${title}`);
    setID(id);

    // console.log(title, id);

    showModal();
  };

  const editmarket = async (title, name, id, category) => {
    setCat(category);
    setHeader(`Edit ${title}`);
    setID(id);
    setEditField(name);

    showModal();
  };
  const deleteRegion = async (id, category, action) => {
    // console.log(action, 'at delete func');
    let apiData = {
      uid: id,
      // status: { id: 2, name: 'inactive' },
      // category: category,
    };
    let res = await dispatch(UpdateRegionClassificationAction(apiData));
    if (res) {
      NotificationManager.success('Successfully Deleted', 'Success', 5000, '');
    }
  };
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

  const [buttonTitle, setButtonTitle] = useState('');

  function camalize(str) {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }

  const submit = (id, category, action) => {
    confirmAlert({
      title: 'Confirm to submit',
      //   message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteRegion(id, category, action),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };
  let renderButton = (title, id, category, name) => {
    // console.log(category, 'at cateogry');
    return (
      <>
        <Button onClick={() => addArea(title, id)} className="text-capitalize">
          <img
            src={add}
            style={{ height: '10px', paddingRight: '5px', width: '15px' }}
            alt="no icon"
          />{' '}
          {category === 'region'
            ? 'area'
            : category === 'area'
            ? 'Thana '
            : category === 'thana'
            ? 'teritorry'
            : category === 'territory'
            ? 'market'
            : category === 'market'
            ? 'market'
            : ''}
        </Button>
        <Button
          onClick={() => {
            setAction('edit');
            editmarket(title, name, id, category);
          }}
          className="text-capitalize"
        >
          <img
            src={edit}
            style={{ height: '10px', paddingRight: '5px', width: '15px' }}
            alt="no icon"
          />{' '}
          {category === 'region'
            ? 'region'
            : category === 'area'
            ? 'area '
            : category === 'thana'
            ? 'thana'
            : category === 'territory'
            ? 'territory'
            : category === 'market'
            ? 'market'
            : ''}
        </Button>
        <Button
          className="text-capitalize"
          onClick={async () => {
            setAction('delete');
            await submit(id, category, action);
          }}
        >
          <img
            src={cancal}
            style={{ height: '10px', paddingRight: '5px', width: '15px' }}
            alt="no icon"
          />{' '}
          {category === 'region'
            ? 'region'
            : category === 'area'
            ? 'area '
            : category === 'thana'
            ? 'thana'
            : category === 'territory'
            ? 'territory'
            : category === 'market'
            ? 'market'
            : ''}
        </Button>
      </>
    );
  };

  const generatePropsAndTest = (node, path) => {
    if (node.category === 'region') {
      return {
        title: (
          <a>
            {node?.title}
            {renderButton('area', path?.at(-1), node.category, node.title)}
            {/* {action === 'edit'
              ? renderButton('Region', path?.at(-1), node.category, node.title)
              : renderButton('area', path?.at(-1), node.category, node.title)} */}
          </a>
        ),
      };
    } else if (node.category === 'area') {
      return {
        title: (
          <a>
            {node.title}

            {renderButton('thana', path?.at(-1), node.category, node.title)}
            {/* {console.log(path?.at(-2), path)} */}
          </a>
        ),
      };
    } else if (node.category === 'thana') {
      return {
        title: (
          <a>
            {node.title}
            {renderButton('teritory', path?.at(-1), node.category, node.title)}
          </a>
        ),
      };
    } else if (node.category === 'territory') {
      return {
        title: (
          <a>
            {node.title}
            {renderButton('market', path?.at(-1), node.category, node.title)}
            {/* {console.log(path?.at(-2), path)} */}
          </a>
        ),
      };
    } else if (node.category === 'market') {
      return {
        title: (
          <a>
            {node.title}
            {renderButton('market', path?.at(-1), node.category, node.title)}
          </a>
          // <a>
          //   {node.title}
          //   {action === 'delete'
          //     ? renderButton('market', path?.at(-1), node.category, node.title)
          //     : renderButton('market', path?.at(-2), node.category, node.title)}
          // </a>
        ),
      };
    } else {
    }
  };

  return (
    <>
      <Card style={{ height: 'auto' }}>
        <CardBody>
          <Row>
            <Colxx xxs="12">
              <h4>Region Classification</h4>

              <Separator className="mb-5" />
            </Colxx>
          </Row>
          {/* <Box sx={{ height: 'auto', flexGrow: 1, overflowY: 'auto' }}> */}
          <Box sx={{ mb: 1 }}>
            <Button
              onClick={addRegion}
              variant="outlined"
              className="text-capitalize"
            >
              Add Region
            </Button>
          </Box>
          {loading ? (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                color="#003766"
              />
            </div>
          ) : (
            <SortableTree
              treeData={data}
              getNodeKey={({ node }) => node.uid}
              onChange={(treeData) => {
                console.log(treeData,"onChgange");
                setData(treeData)
              }}
              isVirtualized={false}
              // getNodeAtPath

              generateNodeProps={({ node, path }) =>
                generatePropsAndTest(node, path)
              }
            />
          )}
          {/* </Box> */}
        </CardBody>
      </Card>
      <AddRegionModal
        show={show}
        handleClose={hideModal}
        header={header}
        id={id}
        editField={editField}
        history={history}
        action={action}
        cat={cat}
      />
    </>
  );
}

// delet marker
// d32dfbcf-fdae-43ab-a65d-4a547043bc90"

// add market
// 8377d943-d677-497c-9010-ffbd7003fe3c
