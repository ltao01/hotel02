package cn.com.djin.ssm.service.impl;

import cn.com.djin.ssm.entity.InRoomInfo;
import cn.com.djin.ssm.entity.Rooms;
import cn.com.djin.ssm.service.InRoomInfoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author：djin
 * @date：2019/05/13 16:55:24
 *   入住信息业务层实现类
 **/
@Service
@Transactional(readOnly = false)//开启事务
public class InRoomInfoServiceImpl extends BaseServiceImpl<InRoomInfo> implements InRoomInfoService {

    //重写动态修改入住信息
    @Override
    public String updateByPrimaryKeySelective(InRoomInfo inRoomInfo) throws Exception {
        //定义手机号修改的状态
        String updPhoneIf = "";
        //定义房间修改的状态
        String updRoomsIf = "";
        //完成手机号的修改
        if(inRoomInfo.getPhone()!=null){
            if(baseMapper.updateByPrimaryKeySelective(inRoomInfo)>0){
                updPhoneIf = "updPhoneSuccess";
            }
        }
        //完成入住信息中房屋的修改
        if(inRoomInfo.getRooms()!=null){
            String[] roomNums = inRoomInfo.getRooms().getRoomNum().split(",");
            Rooms rooms0 = new Rooms();  //原房间号
            rooms0.setRoomNum(roomNums[0]);
            rooms0.setRoomStatus("2");
            Rooms rooms1 = new Rooms();  //新选中的房间号
            rooms1.setRoomNum(roomNums[1]);
            rooms1.setRoomStatus("1");
            InRoomInfo newInRoomInfo1 = new InRoomInfo();
            newInRoomInfo1.setId(inRoomInfo.getId());
            newInRoomInfo1.setRooms(rooms1);
            if(baseMapper.updateByPrimaryKeySelective(newInRoomInfo1)>0&&
                   roomsMapper.updateByCoulmnSelective(rooms0)>0&&
                      roomsMapper.updateByCoulmnSelective(rooms1)>0){
                updRoomsIf = "updRoomNumSuccess";
            }
        }
        return updPhoneIf+updRoomsIf;
    }

    //重写入住信息添加的方法
    @Override
    public String save(InRoomInfo inRoomInfo) throws Exception {
        Integer saveInRoomInfoIf = baseMapper.insert(inRoomInfo);
        Rooms rooms = inRoomInfo.getRooms();
        rooms.setRoomStatus("1");
        Integer updRoomsIf = roomsMapper.updateByPrimaryKeySelective(rooms);
        if(saveInRoomInfoIf>0&&updRoomsIf>0){
            return "success";
        }else{
            return "fail";
        }
    }
}
