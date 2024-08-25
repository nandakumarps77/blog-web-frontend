// src/components/OptionalTags.js
import "./optionaltag.css"
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Sports',
  'Food',
  'Art',
  'Travel',
  'Vehcle',
  'Movie',
];

function getStyles(name, selectedTags, theme) {
  return {
    fontWeight:
      selectedTags.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function OptionalTags({ tags, handleTagsChange }) {
  const theme = useTheme();
  const [selectedTags, setSelectedTags] = React.useState(tags);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const newTags = typeof value === 'string' ? value.split(',') : value;
    setSelectedTags(newTags);
    console.log("tags:",newTags)
    handleTagsChange(newTags);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Tags</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          className='se'
          multiple
          value={selectedTags}
          onChange={handleChange}
          input={<OutlinedInput label="Tags" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedTags, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
