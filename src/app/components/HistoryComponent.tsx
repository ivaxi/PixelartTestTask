import { TablePagination } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { googleImageIpiPath } from "../api/GoogleApi";
import { Game } from "../models/game";
import { TemperatureLabel } from "./TemperatureLabel";


const useStyles = makeStyles({
  table: {
	  minWidth: 650
  },
  tableImage: {
	  height: 50
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  }
});


interface IHistoryComponentProps {
  history: Game[];
}
export const HistoryComponent = (props: IHistoryComponentProps) => {
  const classes = useStyles();
  const {history} = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  if (history.length === 0) {
	  return <div>No scores results</div>;
  }
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
	  <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell align="left">City name</TableCell>
              <TableCell align="left">Temperature</TableCell>
              <TableCell align="center">Result</TableCell>
              <TableCell align="right">Temperature</TableCell>
              <TableCell align="right">City name</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" align="left" scope="row" style={{position: "relative", width: "100px"}}><TableImage imgRef={row.city1.googleInfo.ImageRef}/></TableCell>
                <TableCell component="th" align="left" scope="row">{row.city1.name}</TableCell>
                <TableCell align="left"><TemperatureLabel value={row.weather1.main.temp}/></TableCell>
                <TableCell align="center">{row.userAnswer.id === row.correctAnswer.id ? "Win" : "Fail"}</TableCell>
                <TableCell align="right"><TemperatureLabel value={row.weather2.main.temp}/></TableCell>
                <TableCell component="th" align="right" scope="row">{row.city2.name}</TableCell>
                <TableCell component="th" align="right" scope="row" style={{position: "relative", width: "100px"}}><TableImage imgRef={row.city2.googleInfo.ImageRef}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 30]}
        component="div"
        count={history.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

const backUpImageRef = "CmRaAAAAfsD2Eg6iNaj5LNZa3PK1R8eAZ0CijjB4Z44KBTBO8lKQ8FfaLXgRXinN0KZzY798xTJvdm_bcHBWFiH-gci6mvxE-aOEeVC5R8iJLgHG7UdAGf4H4_fOYex67U3cTfuJEhBB_V-lU2aP3Smucn9flq3YGhTfxz1aTdVuIYhpjATU2FNFbZ2ezQ";

export const TableImage = (props: {imgRef: string}) => {
  const classes = useStyles();
  return  (
	  <span className={classes.imageSrc} style={{backgroundImage: `url(${googleImageIpiPath(backUpImageRef)})` }}>
  		<span className={classes.imageSrc} style={{backgroundImage: `url(${googleImageIpiPath(props.imgRef)})`, backdropFilter: "blur(7px)"	}}/>
    </span>
  );
};