var $table = $('#table');
var $remove = $('#remove');
var selections = [];

function getIdSelections() {
  return $.map($table.bootstrapTable('getSelections'), function (row) {
    return row.id;
  });
}

function responseHandler(res) {
  $.each(res.rows, function (i, row) {
    row.state = $.inArray(row.id, selections) !== -1;
  });
  return res;
}

function detailFormatter(index, row) {
  var html = [];
  $.each(row, function (key, value) {
    html.push('<p><b>' + key + ':</b> ' + value + '</p>');
  });
  return html.join('');
}

function operateFormatter(value, row, index) {
  return [
    '<a class="remove" href="javascript:void(0)" title="Remove">',
    `<svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 5V17.5C1 18.3284 1.67157 19 2.5 19H11.5C12.3284 19 13 18.3284 13 17.5V5H1Z" fill="#EF5350"/>
    <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M9 1.5V1C9 0.447715 8.55228 0 8 0H6C5.44772 0 5 0.447715 5 1V1.5H0.5C0.223858 1.5 0 1.72386 0 2V2.5C0 2.77614 0.223858 3 0.5 3H13.5C13.7761 3 14 2.77614 14 2.5V2C14 1.72386 13.7761 1.5 13.5 1.5H9Z" fill="#EF5350"/>
    </svg>
    `,
    '</a>',
  ].join('');
}

window.operateEvents = {
  'click .like': function (e, value, row, index) {
    alert('You click like action, row: ' + JSON.stringify(row));
  },
  'click .remove': function (e, value, row, index) {
    $table.bootstrapTable('remove', {
      field: 'id',
      values: [row.id],
    });
  },
};

function totalTextFormatter(data) {
  return 'Total';
}

function totalNameFormatter(data) {
  return data.length;
}

function totalPriceFormatter(data) {
  var field = this.field;
  return (
    '$' +
    data
      .map(function (row) {
        return +row[field].substring(1);
      })
      .reduce(function (sum, i) {
        return sum + i;
      }, 0)
      .toFixed(2)
  );
}

function initTable() {
  $table.bootstrapTable('destroy').bootstrapTable({
    height: 870,
    locale: $('#locale').val(),
    columns: [
      [
        {
          field: 'state',
          checkbox: true,
          rowspan: 2,
          align: 'center',
          valign: 'middle',
        },
        {
          title: 'ID',
          field: 'id',
          rowspan: 2,
          align: 'center',
          valign: 'middle',
          sortable: true,
          footerFormatter: totalTextFormatter,
        },
        {
          title: 'Coin Details',
          colspan: 3,
          align: 'center',
        },
      ],
      [
        {
          field: 'name',
          title: 'Name',
          sortable: true,
          footerFormatter: totalNameFormatter,
          align: 'center',
        },
        {
          field: 'price',
          title: 'Price',
          sortable: true,
          align: 'center',
          footerFormatter: totalPriceFormatter,
        },
        {
          field: 'operate',
          title: 'Action',
          align: 'center',
          clickToSelect: false,
          events: window.operateEvents,
          formatter: operateFormatter,
        },
      ],
    ],
  });
  $table.on(
    'check.bs.table uncheck.bs.table ' +
      'check-all.bs.table uncheck-all.bs.table',
    function () {
      $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);

      // save your data, here just save the current page
      selections = getIdSelections();
      // push or splice the selections if you want to save all data selections
    }
  );
  $table.on('all.bs.table', function (e, name, args) {
    console.log(name, args);
  });
  $remove.click(function () {
    var ids = getIdSelections();
    $table.bootstrapTable('remove', {
      field: 'id',
      values: ids,
    });
    $remove.prop('disabled', true);
  });
}

$(function () {
  initTable();

  $('#locale').change(initTable);
});
