package cn.com.djin.ssm.service.impl;

import cn.com.djin.ssm.mapper.*;
import cn.com.djin.ssm.service.BaseService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author：djin
 * @date：2019/05/16 16:11:36
 *   <T>：表示泛指实体类型
 *   基础业务层实现类
 **/
public class BaseServiceImpl<T> implements BaseService<T> {

    //注入Mapper代理对象
    @Autowired
    protected BaseMapper<T> baseMapper;

    //入住信息mapper对象
    @Autowired
    protected InRoomInfoMapper inRoomInfoMapper;

    //房屋信息mapper对象
    @Autowired
    protected RoomsMapper roomsMapper;

    //消费信息mapper对象
    @Autowired
    protected RoomSaleMapper roomSaleMapper;

    //订单信息mapper对象
    @Autowired
    protected OrdersMapper ordersMapper;

    //权限Mapper对象
    @Autowired
    protected AuthorityMapper authorityMapper;

    //map集合对象
    protected Map<String,Object> map = new HashMap<String,Object>();

    //根据主键id删除单个数据
    @Override
    public String removeByPrimaryKey(Integer id) throws Exception {
        if(baseMapper.deleteByPrimaryKey(id)>0){
            return "success";
        }else{
            return "fail";
        }
    }

    //添加
    @Override
    public String save(T t) throws Exception{
        if(baseMapper.insert(t)>0){
            return "success";
        }else{
            return "fail";
        }
    }

    //动态添加字段数据
    @Override
    public String saveSelective(T t) throws Exception{
        if(baseMapper.insertSelective(t)>0){
            return "success";
        }else{
            return "fail";
        }
    }

    //加载表所有数据
    @Override
    public List<T> findAll() throws Exception {
        return baseMapper.selectAll();
    }

    //根据主键id查询单个数据
    @Override
    public T findByPrimaryKey(Integer id) throws Exception{
        return baseMapper.selectByPrimaryKey(id);
    }

    //根据主键id动态修改数据部分字段
    @Override
    public String updateByPrimaryKeySelective(T t) throws Exception{
        if(baseMapper.updateByPrimaryKeySelective(t)>0){
            return "success";
        }else{
            return "fail";
        }
    }

    //根据主键id修改全部数据字段
    @Override
    public String updateByPrimaryKey(T t) throws Exception{
        if(baseMapper.updateByPrimaryKey(t)>0){
            return "success";
        }else{
            return "fail";
        }
    }

    //根据其它字段动态修改数据
    @Override
    public String updateByCoulmnSelective(T t) throws Exception {
        if(baseMapper.updateByCoulmnSelective(t)>0){
            return "success";
        }else{
            return "fail";
        }
    }

    //根据单个指明条件进行分页查询
    @Override
    public Map<String, Object> findTPByPramas(T t,Integer pageNum, Integer pageSize) throws Exception {
        PageHelper.startPage(pageNum,pageSize);
        PageInfo<T> pageInfo = new PageInfo<T>(baseMapper.selectTPByPramas(t));
        map.put("data",pageInfo.getList());
        map.put("count",pageInfo.getTotal());
        return map;
    }

    //根据主键id进行批量删除
    @Override
    public String removeBatchByPrimaryKeys(Integer[] items) throws Exception {
        if(baseMapper.deleteBatchByPrimaryKeys(items)>0){
            return "success";
        }else{
            return "fail";
        }
    }

    //根据动态条件查询多条数据
    @Override
    public List<T> findManyTByPramas(T t) throws Exception {
        return baseMapper.selectManyTByPramas(t);
    }

    //根据动态条件查询单个数据
    @Override
    public T findOneByPramas(T t) throws Exception {
        return baseMapper.selectOneByPramas(t);
    }

    //根据条件查询数据条数
    @Override
    public Integer getCountsByPramas(T t) throws Exception {
        return baseMapper.selectCountsByPeamas(t);
    }

    //根据条件删除
    @Override
    public String removeTByPeamas(T t) throws Exception {
        if(baseMapper.deleteTByPramas(t)>0){
            return "success";
        }else{
            return "fail";
        }
    }
}
