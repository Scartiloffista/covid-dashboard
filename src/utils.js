function getDates(list_of_items) {
    return list_of_items.map(i => i.data.split("T")[0]);
}

function getInfo(list_of_report, key) {
    return list_of_report.map(i => i[key]);
  }

function createDataSet(list_of_report, required_fields) {
    var list_of_colors = ['red', 'green', 'orange', 'peru', 'blue ']
    var dataSet = new Object()
    dataSet.labels = getDates(list_of_report)
    dataSet.datasets = []
    required_fields.forEach(element => {
        dataSet.datasets.push(
            {
                label: element,
                fill: true,
                borderColor: list_of_colors.shift(),
                data: getInfo(list_of_report, element)
            }
        )
    });
    return dataSet;
}

export default createDataSet;

