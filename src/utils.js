function getDates(list_of_items) {
    return list_of_items.map(i => i.data.split("T")[0]);
}

function getInfo(list_of_report, key) {
    return list_of_report.map(i => i[key]);
  }

function createDataSet(list_of_report, required_fields) {
    // var list_of_colors = ['darkorchid', 'red', 'green', 'orange', 'peru', 'blue']
    var list_of_bg_colors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ]
    var list_of_b_colors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ]
    var dataSet = new Object()
    dataSet.labels = getDates(list_of_report)
    dataSet.datasets = []
    required_fields.forEach(element => {
        var type = (element.startsWith("percentuale")) ? 'bar' : 'line'
        // var color = !(element.startsWith("percentuale")) ? list_of_colors.shift() : 'rgba(0, 0, 255, 0.1)'
        dataSet.datasets.push(
            {
                label: element,
                type: type,
                borderColor: list_of_b_colors.shift(),
                backgroundColor: list_of_bg_colors.shift(),
                data: getInfo(list_of_report, element),
                borderWidth: 1
            }
        )
    });
    return dataSet;
}

export default createDataSet;

