import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  navBar: {
    backgroundColor: "#203040",
    "& a": {
      color: "#ffffff",
      marginLeft: 10,
    },
  },
  brand:{
    fontWeight: 'bold',
    fontSize: '1.5rem'
  },
  grow: {
    flexGrow: 1 // make space in-between
  },
  main: {
    minHeight: "80vh",
  },
  footer: {
    marginTop: 10,
    textAlign: "center",
  },
  section: {
    marginTop: 10,
    marginButtom: 10
  }
});

export default useStyles;
