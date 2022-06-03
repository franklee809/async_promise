let domainList =
    [
        'https://www.agronet.com.my',
        'https://www.hsbc.com.my',
        'https://cdn.hsbc.com.my',
        'https://tags.tiqcdn.com',
        'https://akamai.tiqcdn.com',
        'https://cdn.appdynamics.com',
    ];

domainList.forEach((domain) => {
    $('.el-form-item__content span').click()
});

domainList.forEach((domain, index) => {
    $(`#main > div > div.el-dialog__wrapper > div > div.el-dialog__body > form > div:nth-last-child(${index + 1}) > div.el-form-item__content > div.el-input > input.el-input__inner`).value = domain;
});
