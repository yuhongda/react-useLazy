export default function(params) {
  const {
    categoryId1,  //一级品类
    categoryId2,  //二级品类
    categoryId3,  //三级品类
    brandId,      //品牌
    propId,       //属性
    date,         //时间
    deptId,       //部门
    dataRange,    //数据范围
    sku,          //商品编码
    distributionCentre,  //配送中心
    elementProject,  //元素项目
  } = params;

  return {
    categoryId1: categoryId1 != null ? categoryId1 : null,
    categoryId2: categoryId2 != null ? categoryId2 : null,
    categoryId3: categoryId3 != null ? categoryId3 : null,
    brandId: brandId != null ? brandId : null,
    propId: propId != null ? propId : null,
    date: date != null ? date : null,
    deptId: deptId != null ? deptId : null,
    dataRange: dataRange != null ? dataRange : null,
    sku: sku != null ? sku : null,
    distributionCentre: distributionCentre != null ? distributionCentre : null,
    elementProject: elementProject != null ? elementProject : null,
  };
}