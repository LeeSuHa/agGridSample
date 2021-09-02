function rowSpan(params) {
  var athlete = params.data.athlete;
  if (athlete === 'Aleksey Nemov') {
    // have all Russia age columns width 2
    return 2;
  } else if (athlete === 'Ryan Lochte') {
    // have all United States column width 4
    return 3;
  } else {
    // all other rows should be just normal
    return 1;
  }
}

var columnDefs = [
  {
    field: 'athlete',
    rowSpan: rowSpan,
    cellClassRules: {
      'cell-span': "value==='Aleksey Nemov' || value==='Ryan Lochte'",
    },
    width: 200,
  },
  { field: 'age', width: 100 },
  { field: 'country', width:60,wrapText: true},//,autoHeight:true
  { field: 'year', width: 100 },
  { field: 'date' },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
];

var gridOptions = {
  columnDefs: columnDefs,
  rowHeight: 120,
  defaultColDef: {
    width: 170,
    resizable: true,
  },
  suppressRowTransform: true,
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  agGrid
    .simpleHttpRequest({
      url: 'https://www.ag-grid.com/example-assets/olympic-winners.json',
    })
    .then(function (data) {
      gridOptions.api.setRowData(data);
    });
});
