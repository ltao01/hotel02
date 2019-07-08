package cn.com.djin.ssm.mapper;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author：djin
 * @date：2019/05/16 15:53:39
 *   <T>：表示泛指实体类型
 *   基础Mapper代理对象
 **/
public interface BaseMapper<T> {

    //根据主键id删除单个数据
    int deleteByPrimaryKey(Integer id) throws Exception;

    //添加数据
    int insert(T t) throws Exception;

    //动态添加数据
    int insertSelective(T t) throws Exception;

    //根据主键id查询单个数据
    T selectByPrimaryKey(Integer id) throws Exception;

    //根据主键动态修改字段数据
    int updateByPrimaryKeySelective(T t) throws Exception;

    //根据其它字段动态修改数据
    int updateByCoulmnSelective(T t) throws Exception;

    //根据主键修改所有字段数据
    int updateByPrimaryKey(T t) throws Exception;

    //加载表所有数据
    List<T> selectAll() throws Exception;

    //根据动态条件分页查询数据
    List<T> selectTPByPramas(@Param("t")T t) throws Exception;

    //根据主键批量删除
    Integer deleteBatchByPrimaryKeys(Integer[] items) throws Exception;

    //根据动态条件查询多条数据
    List<T> selectManyTByPramas(@Param("t") T t) throws Exception;

    //根据动态条件查询单个数据
    T selectOneByPramas(@Param("t") T t) throws Exception;

    //根据条件查询数据条数
    Integer selectCountsByPeamas(@Param("t") T t) throws Exception;

    //根据条件删除
    Integer deleteTByPramas(@Param("t")T t) throws Exception;

}
