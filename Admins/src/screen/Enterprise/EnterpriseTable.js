import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import EnterpriseModal from "./EnterpriseModal";
import { DataContext } from "../../AppContext";
import axios from "axios";

function createData(name, email, number) {
   return {
      name,
      email,
      number,

      details: [
         {
            templates: "222",
            invitees: "1111",
            comments: "Need excillent purchase experience",
         },
         {
            templates: "222",
            invitees: "1111",
            comments: "Need excillent purchase experience",
         },
         {
            templates: "222",
            invitees: "1111",
            comments: "Need excillent purchase experience",
         },
      ],
   };
}

function Row(props) {
   const { row } = props;
   const [open, setOpen] = React.useState(false);
   return (
      <React.Fragment>
         <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
               <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </IconButton>
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell align="center">{row.email}</TableCell>
            <TableCell align="center">{row.phone}</TableCell>
            <TableCell align="center">
               <Button onClick={()=>props.toggleModal(row.id)}>Send Link</Button>
            </TableCell>
         </TableRow>
         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: open ? "1px solid #c4c4c4" : "none" }} colSpan={5}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                     <Typography variant="h6" gutterBottom component="div">
                        Details
                     </Typography>
                     <Table size="small" aria-label="purchases">
                        <TableHead>
                           <TableRow sx={{ "& th": { fontWeight: "600", borderBottom: "1px solid #795DA8" } }}>
                              <TableCell>Company</TableCell>
                              <TableCell align="center">Title</TableCell>
                              <TableCell align="center">Contact No</TableCell>
                              <TableCell align="center">Work E-mail</TableCell>
                              <TableCell align="center">Templates</TableCell>
                              <TableCell align="center">Invitees</TableCell>
                              <TableCell align="center">Comments</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           <TableRow>
                              <TableCell>{row.details.company}</TableCell>
                              <TableCell align="center">{row.details.title}</TableCell>
                              <TableCell align="center">{row.details.phoneNumber}</TableCell>
                              <TableCell align="center">{row.details.workEmail}</TableCell>
                              <TableCell align="center">{row.details.templateLimit}</TableCell>
                              <TableCell align="center">{row.details.inviteeLimit}</TableCell>
                              <TableCell align="center">{row.details.comment}</TableCell>
                           </TableRow>
                        </TableBody>
                     </Table>
                  </Box>
               </Collapse>
            </TableCell>
         </TableRow>
      </React.Fragment>
   );
}

// =========================================
// =========================================
// =========================================
const  EnterpriseTable = ()=> {
   const [enterpriseData, setEnterpriseData] = React.useState([]);
   const [openModal, setOpenModal] = React.useState(false);
   const [enterpriseId, setEnterpriseId] = React.useState("");
   const { snackbar } = React.useContext(DataContext);

   const toggleModal = (id) => {
    if(openModal){
        setEnterpriseId("");
        setOpenModal(!openModal);

    } else{
        setEnterpriseId(id)
        setOpenModal(!openModal);
    }
   };

   const getEnterpriseData = async () => {
      try {
         const { data } = await axios.get("/enterprise/get");
         console.log(data);
         setEnterpriseData(data?.requests);
      } catch (error) {
         snackbar("error", error.message);
      }
   };

   React.useEffect(() => {
      getEnterpriseData();
   }, [enterpriseId]);

   return (
      <>
         <TableContainer sx={{ border: "2px solid #795DA8", borderRadius: "4px" }}>
            <Table aria-label="collapsible table">
               <TableHead>
                  <TableRow sx={{ "& th": { fontWeight: "600", borderBottom: "1px solid #795DA8" } }}>
                     <TableCell />
                     <TableCell>Name</TableCell>
                     <TableCell align="center">Email</TableCell>
                     <TableCell align="center">Number</TableCell>
                     <TableCell align="center">Send Link</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody sx={{ "& td": { borderBottom: "1px solid #c4c4c4" } }}>
                  {
                     enterpriseData.length === 0 && <Typography textAlign={"center"} width={"100%"}>No data to display</Typography>
                  }
                  {enterpriseData.map((row) => (
                     <Row key={row.id} row={row} toggleModal={toggleModal} />
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
         {/* ========= 👇Modal for amount👇  ============ */}
         <EnterpriseModal openModal={openModal} toggleModal={toggleModal} enterpriseId={enterpriseId} 
        
         />
      </>
   );
}

export default  EnterpriseTable