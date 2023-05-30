(function ($) {
  // svg inject
  SVGInject(document.querySelectorAll('img.svgInject'));

  $('.exchange__widget__order-buy-coin .dropdown-menu a').on(
    'click',
    function () {
      $(this)
        .parents('.exchange__widget__order-buy-coin')
        .find('.dropdown-toggle')
        .html($(this).html());
    }
  );

  // header bar toggle
  $('.header__sidebar-icon').on('click', function () {
    $('body').toggleClass('mobile-nav');
  });

  // trading chart dark
  if ($('#trading-chart-dark').length) {
    let Selector = document.getElementById('trading-chart-dark');
    const chart = LightweightCharts.createChart(Selector, {
      width: window.innerWidth,
      height: window.innerHeight,
      layout: {
        backgroundColor: '#1a1736',
        textColor: '#b2b5be',
      },
      grid: {
        vertLines: {
          color: '#2e2a4d',
        },
        horzLines: {
          color: '#2e2a4d',
        },
      },
      crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#46495d',
      },
      timeScale: {
        borderColor: '#46495d',
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#05c46b',
      downColor: '#ff3f34',
      borderDownColor: '#ff3f34',
      borderUpColor: '#05c46b',
      wickDownColor: '#ff3f34',
      wickUpColor: '#05c46b',
    });

    const volumeSeries = chart.addHistogramSeries({
      color: '#385263',
      lineWidth: 2,
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.9,
        bottom: 0,
      },
    });

    for (let i = 0; i < 150; i++) {
      const bar = nextBar();
      candleSeries.update(bar);
      volumeSeries.update(bar);
    }

    resize();

    setInterval(() => {
      const bar = nextBar();
      candleSeries.update(bar);
      volumeSeries.update(bar);
    }, 3000);

    window.addEventListener('resize', resize, false);

    function resize() {
      chart.applyOptions({
        width: $('#trading-chart-dark').width(),
        height: 600,
      });

      setTimeout(() => chart.timeScale().fitContent(), 0);
    }

    function nextBar() {
      if (!nextBar.date) nextBar.date = new Date(2020, 0, 0);
      if (!nextBar.bar)
        nextBar.bar = { open: 100, high: 104, low: 98, close: 103 };

      nextBar.date.setDate(nextBar.date.getDate() + 1);
      nextBar.bar.time = {
        year: nextBar.date.getFullYear(),
        month: nextBar.date.getMonth() + 1,
        day: nextBar.date.getDate(),
      };

      let old_price = nextBar.bar.close;
      let volatility = 0.1;
      let rnd = Math.random();
      let change_percent = 2 * volatility * rnd;

      if (change_percent > volatility) change_percent -= 2 * volatility;

      let change_amount = old_price * change_percent;
      nextBar.bar.open = nextBar.bar.close;
      nextBar.bar.close = old_price + change_amount;
      nextBar.bar.high =
        Math.max(nextBar.bar.open, nextBar.bar.close) +
        Math.abs(change_amount) * Math.random();
      nextBar.bar.low =
        Math.min(nextBar.bar.open, nextBar.bar.close) -
        Math.abs(change_amount) * Math.random();
      nextBar.bar.value = Math.random() * 100;
      nextBar.bar.color =
        nextBar.bar.close < nextBar.bar.open
          ? 'rgba(255, 128, 159, 0.25)'
          : 'rgba(107, 255, 193, 0.25)';

      return nextBar.bar;
    }
  }

  // trading chart light
  if ($('#trading-chart-light').length) {
    let Selector = document.getElementById('trading-chart-light');
    const chart = LightweightCharts.createChart(Selector, {
      width: window.innerWidth,
      height: window.innerHeight,
      layout: {
        backgroundColor: '#fbfbfb',
        textColor: '#000000',
      },
      grid: {
        vertLines: {
          color: '#e6e6e6',
        },
        horzLines: {
          color: '#e6e6e6',
        },
      },
      crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#46495d',
      },
      timeScale: {
        borderColor: '#46495d',
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#05c46b',
      downColor: '#ff3f34',
      borderDownColor: '#ff3f34',
      borderUpColor: '#05c46b',
      wickDownColor: '#ff3f34',
      wickUpColor: '#05c46b',
    });

    const volumeSeries = chart.addHistogramSeries({
      color: '#385263',
      lineWidth: 2,
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.9,
        bottom: 0,
      },
    });

    for (let i = 0; i < 150; i++) {
      const bar = nextBar();
      candleSeries.update(bar);
      volumeSeries.update(bar);
    }

    resize();

    setInterval(() => {
      const bar = nextBar();
      candleSeries.update(bar);
      volumeSeries.update(bar);
    }, 3000);

    window.addEventListener('resize', resize, false);

    function resize() {
      chart.applyOptions({
        width: $('#trading-chart-light').width(),
        height: 600,
      });

      setTimeout(() => chart.timeScale().fitContent(), 0);
    }

    function nextBar() {
      if (!nextBar.date) nextBar.date = new Date(2020, 0, 0);
      if (!nextBar.bar)
        nextBar.bar = { open: 100, high: 104, low: 98, close: 103 };

      nextBar.date.setDate(nextBar.date.getDate() + 1);
      nextBar.bar.time = {
        year: nextBar.date.getFullYear(),
        month: nextBar.date.getMonth() + 1,
        day: nextBar.date.getDate(),
      };

      let old_price = nextBar.bar.close;
      let volatility = 0.1;
      let rnd = Math.random();
      let change_percent = 2 * volatility * rnd;

      if (change_percent > volatility) change_percent -= 2 * volatility;

      let change_amount = old_price * change_percent;
      nextBar.bar.open = nextBar.bar.close;
      nextBar.bar.close = old_price + change_amount;
      nextBar.bar.high =
        Math.max(nextBar.bar.open, nextBar.bar.close) +
        Math.abs(change_amount) * Math.random();
      nextBar.bar.low =
        Math.min(nextBar.bar.open, nextBar.bar.close) -
        Math.abs(change_amount) * Math.random();
      nextBar.bar.value = Math.random() * 100;
      nextBar.bar.color =
        nextBar.bar.close < nextBar.bar.open
          ? 'rgba(255, 128, 159, 0.25)'
          : 'rgba(107, 255, 193, 0.25)';

      return nextBar.bar;
    }
  }

  // trading chart version3
  if ($('#trading-chart-transparent').length) {
    let Selector = document.getElementById('trading-chart-transparent');
    const chart = LightweightCharts.createChart(Selector, {
      width: window.innerWidth,
      height: window.innerHeight,
      layout: {
        backgroundColor: '#ffffff05',
        textColor: '#ffffff',
      },
      grid: {
        vertLines: {
          color: '#ffffff0d',
        },
        horzLines: {
          color: '#ffffff0d',
        },
      },
      crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#46495d',
      },
      timeScale: {
        borderColor: '#46495d',
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#05c46b',
      downColor: '#ff3f34',
      borderDownColor: '#ff3f34',
      borderUpColor: '#05c46b',
      wickDownColor: '#ff3f34',
      wickUpColor: '#05c46b',
    });

    const volumeSeries = chart.addHistogramSeries({
      color: '#385263',
      lineWidth: 2,
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.9,
        bottom: 0,
      },
    });

    for (let i = 0; i < 150; i++) {
      const bar = nextBar();
      candleSeries.update(bar);
      volumeSeries.update(bar);
    }

    resize();

    setInterval(() => {
      const bar = nextBar();
      candleSeries.update(bar);
      volumeSeries.update(bar);
    }, 3000);

    window.addEventListener('resize', resize, false);

    function resize() {
      chart.applyOptions({
        width: $('#trading-chart-transparent').width(),
        height: 600,
      });

      setTimeout(() => chart.timeScale().fitContent(), 0);
    }

    function nextBar() {
      if (!nextBar.date) nextBar.date = new Date(2020, 0, 0);
      if (!nextBar.bar)
        nextBar.bar = { open: 100, high: 104, low: 98, close: 103 };

      nextBar.date.setDate(nextBar.date.getDate() + 1);
      nextBar.bar.time = {
        year: nextBar.date.getFullYear(),
        month: nextBar.date.getMonth() + 1,
        day: nextBar.date.getDate(),
      };

      let old_price = nextBar.bar.close;
      let volatility = 0.1;
      let rnd = Math.random();
      let change_percent = 2 * volatility * rnd;

      if (change_percent > volatility) change_percent -= 2 * volatility;

      let change_amount = old_price * change_percent;
      nextBar.bar.open = nextBar.bar.close;
      nextBar.bar.close = old_price + change_amount;
      nextBar.bar.high =
        Math.max(nextBar.bar.open, nextBar.bar.close) +
        Math.abs(change_amount) * Math.random();
      nextBar.bar.low =
        Math.min(nextBar.bar.open, nextBar.bar.close) -
        Math.abs(change_amount) * Math.random();
      nextBar.bar.value = Math.random() * 100;
      nextBar.bar.color =
        nextBar.bar.close < nextBar.bar.open
          ? 'rgba(255, 128, 159, 0.25)'
          : 'rgba(107, 255, 193, 0.25)';

      return nextBar.bar;
    }
  }

  // $('.navigation').on('hover', function () {
  //   $(this).toggleClass('navigation--open');
  // });

  // make tr linkable
  $('.markets-pair-list tr').on('click', function () {
    window.location = $(this).data('href');
  });

  $(
    '.exchange__widget__table, .exchange__widget__order-note-item .dropdown-menu'
  ).each(function () {
    new PerfectScrollbar(this, {
      maxScrollbarLength: 50,
    });
  });

  if (document.getElementById('marketItem1')) {
    am4core.ready(function () {
      // Create chart
      var chart = am4core.create('marketItem1', am4charts.XYChart);

      chart.data = generateChartData();

      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.baseInterval = {
        timeUnit: 'minute',
        count: 1,
      };
      dateAxis.tooltip.disabled = true;
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.labels.template.disabled = true;
      dateAxis.renderer.ticks.template.disabled = true;
      dateAxis.renderer.paddingBottom = 15;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.renderer.ticks.template.disabled = true;

      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'prices';
      series.tooltipText = 'prices: [bold]{valueY}[/]';
      series.fillOpacity = 0.1;
      series.fill = am4core.color('#00cc93');
      series.stroke = am4core.color('#00cc93');
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color('#1a1736');
      series.tooltip.background.stroke = am4core.color('#1a1736');

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.opacity = 1;
      dateAxis.start = 0;
      dateAxis.keepSelection = true;
      chart.zoomOutButton.background.fill = am4core.color(
        'rgba(255, 255, 255, 0.11)'
      );
      chart.zoomOutButton.icon.stroke = am4core.color('#ebebeb');
      chart.zoomOutButton.background.states.getKey(
        'hover'
      ).properties.fill = am4core.color('#00cc93');

      function generateChartData() {
        var chartData = [];
        // current date
        var firstDate = new Date();
        // now set 500 minutes back
        firstDate.setMinutes(firstDate.getDate() - 500);

        // and generate 500 data items
        var prices = 500;
        for (var i = 0; i < 500; i++) {
          var newDate = new Date(firstDate);
          // each time we add one minute
          newDate.setMinutes(newDate.getMinutes() + i);
          // some random number
          prices += Math.round(
            (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
          );
          // add data item to the array
          chartData.push({
            date: newDate,
            prices: prices,
          });
        }
        return chartData;
      }
    });
  }
  if (document.getElementById('marketItem2')) {
    am4core.ready(function () {
      // Create chart
      var chart = am4core.create('marketItem2', am4charts.XYChart);

      chart.data = generateChartData();

      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.baseInterval = {
        timeUnit: 'minute',
        count: 1,
      };
      dateAxis.tooltip.disabled = true;
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.labels.template.disabled = true;
      dateAxis.renderer.ticks.template.disabled = true;
      dateAxis.renderer.paddingBottom = 15;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.renderer.ticks.template.disabled = true;

      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'prices';
      series.tooltipText = 'prices: [bold]{valueY}[/]';
      series.fillOpacity = 0.1;
      series.fill = am4core.color('#00cc93');
      series.stroke = am4core.color('#00cc93');
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color('#1a1736');
      series.tooltip.background.stroke = am4core.color('#1a1736');

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.opacity = 1;
      dateAxis.start = 0;
      dateAxis.keepSelection = true;
      chart.zoomOutButton.background.fill = am4core.color(
        'rgba(255, 255, 255, 0.11)'
      );
      chart.zoomOutButton.icon.stroke = am4core.color('#ebebeb');
      chart.zoomOutButton.background.states.getKey(
        'hover'
      ).properties.fill = am4core.color('#00cc93');

      function generateChartData() {
        var chartData = [];
        // current date
        var firstDate = new Date();
        // now set 500 minutes back
        firstDate.setMinutes(firstDate.getDate() - 500);

        // and generate 500 data items
        var prices = 500;
        for (var i = 0; i < 500; i++) {
          var newDate = new Date(firstDate);
          // each time we add one minute
          newDate.setMinutes(newDate.getMinutes() + i);
          // some random number
          prices += Math.round(
            (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
          );
          // add data item to the array
          chartData.push({
            date: newDate,
            prices: prices,
          });
        }
        return chartData;
      }
    });
  }
  if (document.getElementById('marketItem3')) {
    am4core.ready(function () {
      // Create chart
      var chart = am4core.create('marketItem3', am4charts.XYChart);

      chart.data = generateChartData();

      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.baseInterval = {
        timeUnit: 'minute',
        count: 1,
      };
      dateAxis.tooltip.disabled = true;
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.labels.template.disabled = true;
      dateAxis.renderer.ticks.template.disabled = true;
      dateAxis.renderer.paddingBottom = 15;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.renderer.ticks.template.disabled = true;

      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'prices';
      series.tooltipText = 'prices: [bold]{valueY}[/]';
      series.fillOpacity = 0.1;
      series.fill = am4core.color('#00cc93');
      series.stroke = am4core.color('#00cc93');
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color('#1a1736');
      series.tooltip.background.stroke = am4core.color('#1a1736');

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.opacity = 1;
      dateAxis.start = 0;
      dateAxis.keepSelection = true;
      chart.zoomOutButton.background.fill = am4core.color(
        'rgba(255, 255, 255, 0.11)'
      );
      chart.zoomOutButton.icon.stroke = am4core.color('#ebebeb');
      chart.zoomOutButton.background.states.getKey(
        'hover'
      ).properties.fill = am4core.color('#00cc93');

      function generateChartData() {
        var chartData = [];
        // current date
        var firstDate = new Date();
        // now set 500 minutes back
        firstDate.setMinutes(firstDate.getDate() - 500);

        // and generate 500 data items
        var prices = 500;
        for (var i = 0; i < 500; i++) {
          var newDate = new Date(firstDate);
          // each time we add one minute
          newDate.setMinutes(newDate.getMinutes() + i);
          // some random number
          prices += Math.round(
            (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
          );
          // add data item to the array
          chartData.push({
            date: newDate,
            prices: prices,
          });
        }
        return chartData;
      }
    });
  }
  if (document.getElementById('marketItem4')) {
    am4core.ready(function () {
      // Create chart
      var chart = am4core.create('marketItem4', am4charts.XYChart);

      chart.data = generateChartData();

      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.baseInterval = {
        timeUnit: 'minute',
        count: 1,
      };
      dateAxis.tooltip.disabled = true;
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.labels.template.disabled = true;
      dateAxis.renderer.ticks.template.disabled = true;
      dateAxis.renderer.paddingBottom = 15;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.renderer.ticks.template.disabled = true;

      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'prices';
      series.tooltipText = 'prices: [bold]{valueY}[/]';
      series.fillOpacity = 0.1;
      series.fill = am4core.color('#00cc93');
      series.stroke = am4core.color('#00cc93');
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color('#1a1736');
      series.tooltip.background.stroke = am4core.color('#1a1736');

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.opacity = 1;
      dateAxis.start = 0;
      dateAxis.keepSelection = true;
      chart.zoomOutButton.background.fill = am4core.color(
        'rgba(255, 255, 255, 0.11)'
      );
      chart.zoomOutButton.icon.stroke = am4core.color('#ebebeb');
      chart.zoomOutButton.background.states.getKey(
        'hover'
      ).properties.fill = am4core.color('#00cc93');

      function generateChartData() {
        var chartData = [];
        // current date
        var firstDate = new Date();
        // now set 500 minutes back
        firstDate.setMinutes(firstDate.getDate() - 500);

        // and generate 500 data items
        var prices = 500;
        for (var i = 0; i < 500; i++) {
          var newDate = new Date(firstDate);
          // each time we add one minute
          newDate.setMinutes(newDate.getMinutes() + i);
          // some random number
          prices += Math.round(
            (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
          );
          // add data item to the array
          chartData.push({
            date: newDate,
            prices: prices,
          });
        }
        return chartData;
      }
    });
  }

  if (document.getElementById('analysisHeatMap')) {
    function generateData(count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = (i + 1).toString() + ' week';
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min;

        series.push({
          x: x,
          y: y,
        });
        i++;
      }
      return series;
    }
    var options = {
      series: [
        {
          name: 'BDL',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'BAB',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'CDN',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'CVC',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'BCH',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'BDL',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'ADD',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'ABT',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'BTC',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
      ],
      chart: {
        height: 400,
        type: 'heatmap',
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#26a69a'],
    };

    new ApexCharts(
      document.querySelector('#analysisHeatMap'),
      options
    ).render();
  }
  if (document.getElementById('analysisHeatMap2')) {
    function generateData(count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = (i + 1).toString() + ' week';
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min;

        series.push({
          x: x,
          y: y,
        });
        i++;
      }
      return series;
    }
    var options = {
      series: [
        {
          name: 'AGI',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'ELF',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'BDL',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'BAB',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'CDN',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'AMP',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'COB',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'DEW',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'EMC',
          data: generateData(7, {
            min: 0,
            max: 90,
          }),
        },
      ],
      chart: {
        height: 400,
        type: 'heatmap',
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#ef5350'],
    };

    new ApexCharts(
      document.querySelector('#analysisHeatMap2'),
      options
    ).render();
  }

  if (document.getElementById('coinShare')) {
    var options = {
      series: [
        {
          name: 'Bitcoin (BTC)',
          data: [66, 53, 48, 72, 80, 86],
        },
        {
          name: 'Ethereum (ETH)',
          data: [44, 36, 33, 22, 24, 55],
        },
        {
          name: 'Binance (XRP)',
          data: [22, 34, 55, 22, 66, 18],
        },
        {
          name: 'Tether (LTC)',
          data: [66, 22, 33, 16, 44, 22],
        },
        {
          name: 'Cardano (ADA)',
          data: [22, 66, 22, 66, 21, 77],
        },
        {
          name: 'Others',
          data: [33, 22, 33, 33, 23, 35],
        },
      ],
      chart: {
        type: 'bar',
        height: 400,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        offsetY: 10,
        height: 20,
      },
      xaxis: {
        categories: ['2020', '2019', '2018', '2017', '2016', '2015'],
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val + '%';
          },
        },
      },
    };
    new ApexCharts(document.querySelector('#coinShare'), options).render();
  }

  if (document.getElementById('walletVolume')) {
    var options = {
      series: [52, 45, 47],
      chart: {
        width: 370,
        type: 'polarArea',
      },
      labels: ['BTC', 'ETH', 'CVC'],
      fill: {
        opacity: 1,
      },
      stroke: {
        width: 1,
        colors: undefined,
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: 'bottom',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          stops: [0, 100],
        },
      },
      colors: ['#F9CF22', '#0224FF', '#22D304'],
      plotOptions: {
        pie: {
          customScale: 1.1,
        },
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
        },
      },
    };

    new ApexCharts(document.querySelector('#walletVolume'), options).render();
  }
  $('.exchange__widget-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: true,
    arrows: false,
    autoplay: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  // lightMode
  $('#themeChange').on('click', function () {
    if (!$('body').hasClass('light')) {
      $('body').addClass('light');
      localStorage.setItem('themeChange', 'off');
      $('#themeChange .moon-icon').css('display', 'none');
      $('#themeChange .sun-icon').css('display', 'inline-block');
    } else {
      $('body').removeClass('light');
      localStorage.setItem('themeChange', 'on');
      $('#themeChange .moon-icon').css('display', 'inline-block');
      $('#themeChange .sun-icon').css('display', 'none');
    }
  });

  if (localStorage.getItem('themeChange') === 'off') {
    document.body.classList.add('light');
  }
  // Not using server warning
  if (location.hostname === '') {
    document.body.insertAdjacentHTML(
      'afterbegin',
      `<style>
      .local-file-open-warning{position:fixed;top:0;left:0;width:100%;height:100%;background:#000000ba;z-index:999999;display:flex;align-items:center;justify-content:center}.local-file-open-warning-inner{background:#fff;display:inline-block;text-align:center;max-width:500px;padding:40px 50px 50px;border-radius:5px;position:relative;margin:50px}.local-file-open-warning-inner h2{font-size:32px}.local-file-open-warning-inner span{position:absolute;top:15px;right:15px;cursor:pointer}.local-file-open-warning-inner span svg{width:25px;height:25px}.local-file-open-warning-inner p{font-size:14px;margin:10px 0}.local-file-open-warning-inner a{display:inline-block;color:#fff;padding:15px 30px;font-size:18px;border-radius:5px;margin-top:25px;border:1px solid #178cff;background:#178cff;transition:.3s}.local-file-open-warning-inner a:hover{background:0 0;color:#178cff}
      </style>
      <div class="local-file-open-warning">
        <div class="local-file-open-warning-inner">
          <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.3" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#EF5350"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0355 8.62132L12.864 5.79289C13.2545 5.40237 13.8877 5.40237 14.2782 5.79289C14.6687 6.18342 14.6687 6.81658 14.2782 7.20711L11.4497 10.0355L14.2782 12.864C14.6687 13.2545 14.6687 13.8877 14.2782 14.2782C13.8877 14.6687 13.2545 14.6687 12.864 14.2782L10.0355 11.4497L7.20711 14.2782C6.81658 14.6687 6.18342 14.6687 5.79289 14.2782C5.40237 13.8877 5.40237 13.2545 5.79289 12.864L8.62132 10.0355L5.79289 7.20711C5.40237 6.81658 5.40237 6.18342 5.79289 5.79289C6.18342 5.40237 6.81658 5.40237 7.20711 5.79289L10.0355 8.62132Z" fill="#EF5350"/>
          </svg>
          </span>
          <h2>You need to use a server</h2>
          <p>You're open the site using a local file. You need to use a server to work SVG image properly. Please follow the documentation</p>
          <a href="https://trendyui.gitbook.io/coinly/server" target="_blank">Documentation</a>
        </div>
      </div>`
    );
  }
  $('.local-file-open-warning-inner span').on('click', function () {
    $('.local-file-open-warning').hide();
  });
})(jQuery);
