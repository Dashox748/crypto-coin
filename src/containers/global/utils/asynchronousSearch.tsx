import { useState, useEffect, Fragment } from "react";
import { Autocomplete } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { CssTextField } from "./styled";
import { fetchSearchProps } from "./fetch";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

interface Film {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

export default function AsynchronousSearch() {
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue.length < 3) return;
    setLoading(true);
    let active = true;

    (async () => {
      const x = await fetchSearchProps(inputValue);
      console.log(x);
      if (active) {
        setOptions([...x]);
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [inputValue]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      sx={{ width: 500, padding: "0!important" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      noOptionsText="Enter at least 3 letters"
      renderOption={(props, option) => {
        return (
          <Link
            to={`/advancedInfo/${option.id}`}
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
                  <img src={option.thumb} alt="thumb" />
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
          sx={{ width: 500, padding: "0!important" }}
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
