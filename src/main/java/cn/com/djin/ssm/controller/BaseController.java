package cn.com.djin.ssm.controller;

import cn.com.djin.ssm.service.AuthorityService;
import cn.com.djin.ssm.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author：djin
 * @date：2019/05/16 16:27:10
 *   <T>：表示泛指实体类型
 *   基础控制器层
 **/
public class BaseController<T> {

    //基础业务层对象
    @Autowired
    protected BaseService<T> baseService;

    //权限业务层
    @Autowired
    protected AuthorityService authorityService;

    //map集合对象
    protected Map<String,Object> map = new HashMap<String,Object>();

    //根据主键id删除单个数据
    @RequestMapping("/delTByPrimaryKey")
    @ResponseBody
    public String delTByPrimaryKey(Integer id){
        try {
            return baseService.removeByPrimaryKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    };

    //添加数据
    @RequestMapping("/insertT")
    @ResponseBody
    public String insertT(T t){
        System.out.println(t);
        try {
            return baseService.save(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    };

    //动态添加数据
    @RequestMapping("/insertTSelective")
    @ResponseBody
    public String insertTSelective(T t){
        try {
            return baseService.saveSelective(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    };

    //根据主键id查询单个数据
    @RequestMapping("/loadTByPrimaryKey")
    @ResponseBody
    public T loadTByPrimaryKey(Integer id){
        try {
            return baseService.findByPrimaryKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    };

    //根据主键动态修改部分数据字段
    @RequestMapping("/updateTByPrimaryKeySelective")
    @ResponseBody
    public String updateTByPrimaryKeySelective(T t){
        try {
            return baseService.updateByPrimaryKeySelective(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    };

    //根据主键修改所有全部数据字段
    @RequestMapping("/updateTByPrimaryKey")
    @ResponseBody
    public String updateTByPrimaryKey(T t){
        try {
            return baseService.updateByPrimaryKey(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    };

    //根据其它字段动态修改数据
    @RequestMapping("/updateTByCoulmnSelective")
    @ResponseBody
    public String updateTByCoulmnSelective(T t){
        try {
            return baseService.updateByCoulmnSelective(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    };

    //根据动态条件分页查询数据
    @RequestMapping("/loadPTByPramas")
    @ResponseBody
    public Map<String,Object> loadPTByPramas(T t,Integer page,Integer limit) {
        try {
            map = baseService.findTPByPramas(t, page, limit);
            map.put("code",0);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",500);
        }
        return map;
    }

    //根据主键批量删除
    @RequestMapping("/removeBatchTByPrimaryKeys")
    @ResponseBody
    public String removeBatchTByPrimaryKeys(Integer[] items){
        try {
            return baseService.removeBatchByPrimaryKeys(items);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //根据动态条件查询多条数据
    @RequestMapping("/loadManyTByPramas")
    @ResponseBody
    public List<T> loadManyTByPramas(T t){
        try {
            return baseService.findManyTByPramas(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //根据动态条件查询单个数据
    @RequestMapping("/loadTByPramas")
    @ResponseBody
    public T loadTByPramas(T t){
        try {
            return baseService.findOneByPramas(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //加载表所有数据
    @RequestMapping("/loadAll")
    @ResponseBody
    public List<T> loadAll(){
        try {
            return baseService.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping("/loadCountsByPramas")
    @ResponseBody
    public Integer loadCountsByPramas(T t){
        System.out.println(t);
        try {
            return baseService.getCountsByPramas(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //根据条件删除
    @RequestMapping("/delTByPramas")
    @ResponseBody
    public String delTByPramas(T t){
        try {
            return baseService.removeTByPeamas(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
