/**
 * Created by Administrator on 2017/3/13.
 */
app.controller('addNewFeeTwoEdit',
    ["$scope","validateService","asset","commonService","$localStorage","adminSet","region","$timeout","modelService","$state","CONSTANTS","$stateParams",
        function( $scope,validateService,asset,commonService,$localStorage,adminSet,region,$timeout,modelService,$state,CONSTANTS,$stateParams) {
            var vm = $scope.vm = {};

            var validateForm = [];

            var ruleId = $stateParams.id;
            vm.id =$stateParams.id;
            vm.productTypes=angular.copy(commonService.product.enumeration).slice(1);

            vm.makeFeeTypeOnes=[
                {name:'按比例',type:1},
                {name:'固定费用',type:2}
            ];
            // vm.makeFeeTypeThree = 0;
            vm.makeFeeTypeTwos=[
                {name:'先收满',type:0},
                {name:'按比例收',type:1}
            ];

            /*vm.initProductFeeRateList = function() {
                var productName = [
                    'CITY_BUS',
                    'AIRPORT_BUS',
                    'TRAIN_STATION_BUS',
                    'SCENIC_BUS',
                    'SCHOOL_BUS',
                    'WORK_BUS',
                    'LINE_BUS',
                    'CUSTOM_BUS',
                    'CAR_HAILING',
                    'TAXI',
                    'CAR_RENTAL',
                    'STATION_BUS',
                    'TOUR_BUS',
                ]
                for(var i = 0; i < 13; i++) {
                    var tempObj = {
                        platformInsuranceType: '1',
                        platformFixInsuranceFeeRate: '',
                        platformServiceType: '1',
                        firmServiceRate: '',
                        platformFixInsuranceFee: '',
                        firmInsuranceRate: '',
                        platformFixServiceFee: '',
                        platformFixServiceFeeRate: '',
                        platformInsuranceRate: '',
                        platformServiceRate: '',
                        distributorRate: '',
                        platformRate: '',
                        productTypeLevelOne:productName[i]
                    }
                    vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList.push(tempObj);
                }
            };*/

            vm.changePlatformType = function (type, ruleIndex) {
                if(type == 1){
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformServiceType = 1;
                        vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixServiceFee = '';
                        data.platformFixServiceFeeType = '';
                        vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixServiceFeeRate = 0;
                    })

                }else{
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformServiceType = 2;
                        data.platformServiceRate = 0;
                    })


                }

            }

            vm.changeplatformInsuranceType = function (type, ruleIndex) {
                if(type == 1){
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformInsuranceType = 1;
                        vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixInsuranceFee = '';
                        data.platformFixInsuranceFeeType = '';
                        vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixInsuranceFeeRate = 0;
                    })

                }else{
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformInsuranceType = 2;
                        data.platformInsuranceRate = '';
                    })


                }

            };
            
            // 添加规则按钮
            vm.addRule = function () {
                var idx = vm.FeeRuleMessage.detailFeeRateList.length;
                vm.copyData.alias = '';
                vm.copyData.startDate = '';
                vm.copyData.endDate = '';
                vm.FeeRuleMessage.detailFeeRateList.push(vm.copyData);
                angular.forEach(vm.FeeRuleMessage.detailFeeRateList, function(data, index) {
                    data.ruleIndex = index;
                });
                validateForm.push(
                    {type: 'input', elem: '#name'+idx, emptyTips: '请输入规则名称'},
                    {type: 'input', elem: '#fromTime'+idx, emptyTips: '请输入规则有效期'},
                    {type: 'input', elem: '#toTime'+idx, emptyTips: '请输入规则有效期'}
                )
             }

            vm.isManOne = function (type,ruleIndex) {
                if(type == 0){
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformFixServiceFeeType = 0;
                        vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixServiceFeeRate = 100;
                    })

                }else{
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformFixServiceFeeType = 1;
                        vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixServiceFeeRate = '';
                    })
                }
            };
            vm.isManTwo = function (type,ruleIndex) {
                if(type == 0){
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformFixInsuranceFeeType = 0;
                        // vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixInsuranceFeeRate = 100;
                    })

                }else{
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformFixInsuranceFeeType = 1;
                        vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixInsuranceFeeRate = '';
                    })
                }
            }

            /*
             * 点击下一步执行的函数
             * */
            vm.newRuleCreateBtn= {
                text: '保存',
                disabled: false,
                newRuleCreate: function(){
                    var validateNew = validateService.submitValidate(validateForm);
                    console.log(validateNew);
                    console.log(validateForm);
                    var validate = vm.constantFee1();
                    var validateNull =  vm.checkIsNull();
                    if (!validateNew) {
                        return false;
                    }
                    if(!validate) {
                        return false;
                    }
                    if(!validateNull) {
                        return false;
                    }
                    console.log(vm.FeeRuleMessage);
                    for(var x in vm.FeeRuleMessage.detailFeeRateList){
                        var _ruleIndex = vm.FeeRuleMessage.detailFeeRateList[x].ruleIndex;
                            angular.forEach(vm.FeeRuleMessage.detailFeeRateList[_ruleIndex].productFeeRateList,function (data,index) {
                            data.platformFixServiceFee = vm.FeeRuleMessage.detailFeeRateList[_ruleIndex].fixPlatformFixServiceFee;
                            data.platformFixServiceFeeRate = vm.FeeRuleMessage.detailFeeRateList[_ruleIndex].fixPlatformFixServiceFeeRate;
                            data.platformFixInsuranceFee = vm.FeeRuleMessage.detailFeeRateList[_ruleIndex].fixPlatformFixInsuranceFee;
                            data.platformFixInsuranceFeeRate = vm.FeeRuleMessage.detailFeeRateList[_ruleIndex].fixPlatformFixInsuranceFeeRate;
                        });
                    }
                    asset.editDefaultFeeRateConfig(vm.id,vm.FeeRuleMessage).success(function (data) {
                        if (data.resultCode == '0') {
                            modelService.Alarm('success', '保存成功!', true, 1000);
                            $timeout(function () {
                                $state.go('app.assetManage.feeManage');
                            }, 1500);
                        } else {
                            modelService.Alarm('info', data.resultMsg, true, 1000);
                        }
                    })

                    // $state.go('app .assetManage.addNewFeeTwo');
                }
            };

            vm.goHistory = function () {
                $state.go('app.assetManage.feeManage')
            };

            vm.constantFee = function() {
                angular.forEach(vm.FeeRuleMessage.detailFeeRateList, function(data1, index1) {
                    var nowData = data1.productFeeRateList[0];
                    if(nowData.platformInsuranceType == 2) {
                        var maxFee = vm.getMax(data1.productFeeRateList);
                        if(nowData.platformFixInsuranceFeeType == 0) {
                            angular.forEach(data1.productFeeRateList, function(data2, index2) {
                                data2.platformFixInsuranceFeeRate = 100 - maxFee;
                            })
                        } else if (nowData.platformFixInsuranceFeeType == 1) {
                            if(nowData.platformFixInsuranceFeeRate > maxFee) {
                                modelService.Alarm('info', '连接保险分成比例与保险公司分成比例之和必须小于等于100', true, 1000);
                                return false;
                            }
                        }
                        /*angular.forEach(data1.productFeeRateList, function(data2, index2) {

                        })*/
                    } else if(nowData.platformInsuranceType == 1) {
                        angular.forEach(data1.productFeeRateList, function(data2, index2) {
                            if(data2.platformInsuranceRate + data2.firmInsuranceRate >= 100) {
                                modelService.Alarm('info', '连接保险分成比例与保险公司分成比例之和必须小于等于100', true, 1000);
                                return false;
                            }
                        })
                    }
                });

                return true;
                // platformInsuranceType
            };

            vm.constantFee1 = function() {
                for(var i in vm.FeeRuleMessage.detailFeeRateList) {
                    var data1 = vm.FeeRuleMessage.detailFeeRateList[i];
                    var nowData = data1.productFeeRateList[0];

                    if(nowData.platformInsuranceType == 2) {
                        var maxFee = vm.getMax(data1.productFeeRateList);
                        if(nowData.platformFixInsuranceFeeType == 0) {
                            for(var x in data1.productFeeRateList) {
                                data1.productFeeRateList[x].platformFixInsuranceFeeRate = 100 - maxFee;
                                data1.fixPlatformFixInsuranceFeeRate=100 - maxFee;
                                // console.log(data1.productFeeRateList[x].platformFixInsuranceFeeRate);
                            }
                        } else if (nowData.platformFixInsuranceFeeType == 1) {
                            if((data1.fixPlatformFixInsuranceFeeRate) > (100 - maxFee)) {
                                // console.log(100 - maxFee);
                                // console.log(+data1.fixPlatformFixInsuranceFeeRate);
                                modelService.Alarm('info', '1连接保险分成比例与保险公司分成比例之和必须小于等于100', true, 1000);
                                return false;
                            }
                        }
                    } else if(nowData.platformInsuranceType == 1) {
                        for(var x in data1.productFeeRateList) {
                            var data2 = data1.productFeeRateList[x];
                            console.log(parseFloat(data2.platformInsuranceRate) + parseFloat(data2.firmInsuranceRate));
                            if((parseFloat(data2.platformInsuranceRate) + parseFloat(data2.firmInsuranceRate)) > 100) {
                                modelService.Alarm('info', '2连接保险分成比例与保险公司分成比例之和必须小于等于100', true, 5000);
                                return false;
                            }
                        }
                    }

                }
                return true;
            };


            vm.getMax = function(arr) {
                var max = 0;
                angular.forEach(arr, function(data, index) {
                    if(data.firmInsuranceRate > max) {
                        max = data.firmInsuranceRate;
                    }
                });
                // console.log(max);
                return max;
            };

            vm.checkIsNull = function () {
                for(var i in vm.FeeRuleMessage.detailFeeRateList){
                    var data1 = vm.FeeRuleMessage.detailFeeRateList[i];
                    var reg = new RegExp("^((\\d{1,2}(\\.\\d{1,2})?)|100|100.00)$");
                    for(var x in data1.productFeeRateList){
                        // 连接佣金验证
                        if(data1.productFeeRateList[x].platformRate!==''){
                            if(!reg.test(data1.productFeeRateList[x].platformRate)) {
                                modelService.Alarm('info', '连接佣金比例输入范围只能是0-100的数字', true, 2000);
                                return false
                            }
                        }else {
                            modelService.Alarm('info', '连接佣金分成不能为空', true, 2000);
                            return false
                        }
                        //保险公司分成验证
                        if(data1.productFeeRateList[x].firmInsuranceRate !==''){
                            if(!reg.test(data1.productFeeRateList[x].firmInsuranceRate)) {
                                modelService.Alarm('info', '保险公司分成比例输入范围只能是0-100的数字', true, 2000);
                                return false
                            }
                        }else {
                            modelService.Alarm('info', '保险公司分成不能为空', true, 2000);
                            return false
                        }
                        //分销佣金验证
                        if(data1.productFeeRateList[x].distributorRate!==''){
                            if(!reg.test(data1.productFeeRateList[x].distributorRate)) {
                                modelService.Alarm('info', '分销佣金比例输入范围只能是0-100的数字', true, 2000);
                                return false
                            }
                        }else {
                            modelService.Alarm('info', '分销佣金不能为空', true, 2000);
                            return false
                        }
                        //分销服务费验证
                        if(data1.productFeeRateList[x].firmServiceRate !== ''){
                            if(!reg.test(data1.productFeeRateList[x].firmServiceRate)) {
                                modelService.Alarm('info', '分销服务费比例输入范围只能是0-100的数字', true, 2000);
                                return false
                            }
                        }else {
                            modelService.Alarm('info', '分销服务费不能为空', true, 2000);
                            return false
                        }
                        //连接服务费的判断
                        if(data1.productFeeRateList[x].platformServiceType == 1){
                            if(data1.productFeeRateList[x].platformServiceRate !== ''){
                                if(!reg.test(data1.productFeeRateList[x].platformServiceRate)) {
                                    modelService.Alarm('info', '连接服务比例输入范围只能是0-100的数字', true, 2000);
                                    return false
                                }
                            }else {
                                modelService.Alarm('info', '连接服务的比例不能为空', true, 2000);
                                return false
                            }
                        }else {
                            if(!data1.fixPlatformFixServiceFee){
                                modelService.Alarm('info', '连接服务的固定费用不能为空', true, 2000);
                                return false
                            }else {
                                if(data1.productFeeRateList[x].platformFixServiceFeeType ==1){
                                    if(!data1.fixPlatformFixServiceFeeRate){
                                        modelService.Alarm('info', '连接服务的固定费用比例不能为空', true, 2000);
                                        return false
                                    }else {
                                        if(!reg.test(data1.fixPlatformFixServiceFeeRate)) {
                                            modelService.Alarm('info', '连接服务的固定费用比例输入范围只能是0-100的数字', true, 2000);
                                            return false
                                        }
                                    }
                                }
                            }
                        }
                        //连接保险分成的判断
                        if(data1.productFeeRateList[x].platformInsuranceType == 1){
                            if(data1.productFeeRateList[x].platformInsuranceRate !==''){

                            }else {
                                modelService.Alarm('info', '连接保险分成比例不能为空', true, 2000);
                                return false
                            }

                        }else {
                            if(data1.fixPlatformFixInsuranceFee!==''){
                                if(data1.productFeeRateList[x].platformFixInsuranceFeeType ==1){
                                    if(!data1.fixPlatformFixInsuranceFeeRate){
                                        modelService.Alarm('info', '连接保险分成的固定费用比例不能为空', true, 2000);
                                        return false
                                    }
                                }
                            }else {
                                modelService.Alarm('info', '连接保险分成的固定费用不能为空', true, 2000);
                                return false
                            }
                        }

                    }
                }
                return true;
            },

            vm.gotoPre = function() {
                $localStorage.FeeRuleAdd = vm.FeeRuleMessage;
                $state.go('app.assetManage.addNewFeeEdit',{id:vm.FeeRuleMessage.id});
            };

            vm.copyData = [];



            vm.init = function () {
                vm.FeeRuleMessage = $localStorage.FeeRuleAdd;
                $timeout(function () {
                    for(var x in vm.FeeRuleMessage.detailFeeRateList){
                        validateForm.push(
                            {type: 'input', elem: '#name'+x, emptyTips: '请输入规则名称'},
                            {type: 'input', elem: '#fromTime'+x, emptyTips: '请输入规则有效期'},
                            {type: 'input', elem: '#toTime'+x, emptyTips: '请输入规则有效期'}
                        );
                        var _ruleIndex = vm.FeeRuleMessage.detailFeeRateList[x].ruleIndex;
                        angular.forEach(vm.FeeRuleMessage.detailFeeRateList[_ruleIndex].productFeeRateList,function (data,index) {
                            vm.FeeRuleMessage.detailFeeRateList[_ruleIndex].fixPlatformFixServiceFee = data.platformFixServiceFee;
                            vm.FeeRuleMessage.detailFeeRateList[_ruleIndex].fixPlatformFixServiceFeeRate = data.platformFixServiceFeeRate;
                            vm.FeeRuleMessage.detailFeeRateList[_ruleIndex].fixPlatformFixInsuranceFee = data.platformFixInsuranceFee;
                            vm.FeeRuleMessage.detailFeeRateList[_ruleIndex].fixPlatformFixInsuranceFeeRate = data.platformFixInsuranceFeeRate;
                            /*if(data.platformFixServiceFeeRate == 100){
                             vm.makeFeeTypeOne = 1
                             }else {
                             vm.makeFeeTypeOne = 2
                             }
                             if(data.platformFixInsuranceFeeRate == 100){
                             vm.makeFeeTypeTwo = 1
                             }else {
                             vm.makeFeeTypeTwo = 2
                             }*/
                        });
                    }
                }, 500);

                vm.copyData = angular.copy(vm.FeeRuleMessage.detailFeeRateList[0]);
                angular.forEach(vm.FeeRuleMessage.detailFeeRateList, function(data, index) {
                    data.ruleIndex = index;
                });
                // vm.initProductFeeRateList();
                // console.log(vm.FeeRuleMessage);
            };
            vm.init();
        }
    ])