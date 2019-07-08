package cn.com.djin.ssm.service;

import com.github.pagehelper.PageInfo;

import java.util.List;
import java.util.Map;

/**
 * @author：djin
 * @date：2019/05/16 16:06:41
 *   <T>：表示泛指实体类型
 *   基础业务层接口
 **/
public interface BaseService<T> {

    //根据主键id删除单个数据
    String removeByPrimaryKey(Integer id) throws Exception;

    //添加数据
    String save(T t) throws Exception;

    //动态添加数据
    String saveSelective(T t) throws Exception;

    //加载表所有数据
    List<T> findAll() throws Exception;

    //根据主键id查询单个数据
    T findByPrimaryKey(Integer id) throws Exception;

    //根据主键动态修改部分数据字段
    String updateByPrimaryKeySelective(T t) throws Exception;

    //根据主键修改所有全部数据字段
    String updateByPrimaryKey(T t) throws Exception;

    //根据其它字段动态修改数据
    String updateByCoulmnSelective(T t) throws Exception;

    //根据动态条件分页查询数据
    Map<String,Object> findTPByPramas(T t,Integer pageNum, Integer pageSize) throws Exception;

    //根据主键批量删除
    String removeBatchByPrimaryKeys(Integer[] items) throws Exception;

    //根据动态条件查询多条数据
    List<T> findManyTByPramas(T t) throws Exception;

    //根据动态条件查询单个数据
    T findOneByPramas(T t) throws Exception;

    Integer getCountsByPramas(T t) throws Exception;

    //根据条件删除
    String removeTByPeamas(T t) throws Exception;
}
