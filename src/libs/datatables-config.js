import $ from 'jquery';
import 'datatables.net-bs5'
import 'datatables.net-dt'


export default function InitTable(selector, options = {}) {
    if (typeof window !== "undefined") {
      $(document).ready(function () {
        const table = $(selector).DataTable();
        if ($.fn.DataTable.isDataTable(selector)) {
          table.destroy(); // Hancurkan instance sebelumnya
        }
        $(selector).DataTable(options);
      });
    }
  }
  