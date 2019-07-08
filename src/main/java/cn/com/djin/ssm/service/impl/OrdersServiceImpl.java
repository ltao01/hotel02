package cn.com.djin.ssm.service.impl;

import cn.com.djin.ssm.entity.InRoomInfo;
import cn.com.djin.ssm.entity.Orders;
import cn.com.djin.ssm.entity.RoomSale;
import cn.com.djin.ssm.service.OrdersService;
import cn.com.djin.ssm.util.DateUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   订单业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class OrdersServiceImpl extends BaseServiceImpl<Orders> implements OrdersService {

    //重写父类中的订单添加方法
    @Override
    public String save(Orders orders) throws Exception {
        String saveOrdersIf = super.save(orders);
        // baseMapper.insert(orders);
        InRoomInfo inRoomInfo = new InRoomInfo();
        inRoomInfo.setId(orders.getInRoomInfo().getId());
        inRoomInfo.setOutRoomStatus("1");
        Integer updinRoomInfoIf = inRoomInfoMapper.updateByPrimaryKeySelective(inRoomInfo);
        Integer updinRoomsIf = roomsMapper.updateByPrimaryKeySelective(orders.getInRoomInfo().getRooms());
        if(saveOrdersIf=="success"&&updinRoomInfoIf>0&&updinRoomsIf>0){
            return "success";
        }else{
            return "fail";
        }
    }

    //重写根据订单编号修改订单状态（支付完成后的操作）
    @Override
    public String updateByCoulmnSelective(Orders orders) throws Exception {
        Integer updOrdersIf = ordersMapper.updateByCoulmnSelective(orders);
        //根据订单编号查询订单数据
        Orders selOrders = ordersMapper.selectOneByPramas(orders);
        String[] arrOthers = selOrders.getOrderOther().split(",");
        String[] arrPrice = selOrders.getOrderPrice().split(",");
        RoomSale roomSale = new RoomSale();
        roomSale.setRoomNum(arrOthers[0]);
        roomSale.setCustomerName(arrOthers[1]);
        roomSale.setStartDate(DateUtil.stringToDate(arrOthers[2]));
        roomSale.setEndDate(DateUtil.stringToDate(arrOthers[3]));
        roomSale.setDays(Integer.parseInt(arrOthers[4]));
        roomSale.setRoomPrice(Double.parseDouble(arrPrice[0]));
        roomSale.setOtherPrice(Double.parseDouble(arrPrice[1]));
        roomSale.setRentPrice(Double.parseDouble(arrPrice[2]));
        roomSale.setSalePrice(selOrders.getOrderMoney().doubleValue());
        Double discountPrice = roomSale.getRentPrice()+roomSale.getOtherPrice()-roomSale.getSalePrice();
        roomSale.setDiscountPrice(discountPrice);
        Integer roomInsIf = roomSaleMapper.insert(roomSale);
        if(updOrdersIf>0&&roomInsIf>0){
            return "success";
        }else{
            return "fail";
        }
    }
}
