import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Autocomplete,
  Grid,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { CssTextField } from "./styled";
import { fetchSearchProps } from "./fetch";
import { OptionsInf } from "./interfaces";
import {temp} from "./staticDataForSearchbar";
export default function AsynchronousSearch() {
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<OptionsInf[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    if (inputValue.length < 3) return;
    setLoading(true);
    let active = true;

    (async () => {
      const x = await fetchSearchProps(inputValue);
      if (active) {
        setOptions([...x]);
      }
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [inputValue]);

  console.log(options);
  return (
    <Autocomplete
        sx={{maxWidth:"500px", padding: "0!important",flex:"1" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      freeSolo={true}
      getOptionLabel={(option: any) => option.name}
      options={options.length > 0 ? options : temp}
      loading={loading}
      noOptionsText="Enter at least 3 letters"
      renderOption={(props, option) => {
        return (
          <Link
            to={`/advancedInfo/${option.api_symbol}`}
            style={{ textDecoration: "none", color: "white" }}
            onClick={() => setInputValue("")}
            key={option.id}
          >
            <li {...props}>
              <Grid
                container
                alignItems="center"
                sx={{ padding: "10px 0" }}
                onClick={() => setInputValue("")}
              >
                <Grid item sx={{ display: "flex", width: 44 }}>
                  <img
                    src={option.thumb}
                    alt="thumb"
                    style={{ width: "30px", height: "30px" }}
                  />
                </Grid>
                <Grid
                  item
                  sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                >
                  <Box component="span">{option.name}</Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </Grid>
              </Grid>
            </li>
          </Link>
        );
      }}
      renderInput={(params) => (
        <CssTextField
          onChange={(event) => setInputValue(event.target.value)}
          sx={{ padding: "0!important" }}
          {...params}
          value={inputValue}
          placeholder="Search any coin ..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}
