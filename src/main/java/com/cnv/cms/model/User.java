/**
 * 
 */
package com.cnv.cms.model;

import java.util.Date;

import javax.validation.constraints.*;

import org.hibernate.validator.constraints.Email;


/**
 * @author Administrator
 *
 */

public class User {
	private int id;
	/*
	 * 用户登录名称
	 */
	@NotNull(message="用户名不能为空")
	private String username;
	/*
	 * 用户密码
	 */
	@NotNull(message="密码不能为空")
	private String password;
	/*
	 * 用户中文名称
	 */
	private String nickname;
	/*
	 * 用户邮箱
	 */
	@Email(message="邮件格式不正确")
	private String email;
	/*
	 * 用户电话
	 */
	@Size(message="手机格式不正确",min=2)
	private String phone;
	/*
	 * 用户状态，0停用，1启用
	 */
	private int status;
	/*
	 * 创建时间
	 */
	private Date createDate;
	
	public User(){}
	public User(int id, String username, String password, String nickname, 
			String email, String phone, int status,Date createDate) {
		
		this.id = id;
		this.username = username;
		this.password = password;
		this.nickname = nickname;
		this.email = email;
		this.phone = phone;
		this.status = status;
		this.createDate = createDate;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
/*	public String toString(){
		return "cms-core:id:"+id+",name:"+username+",password:"+password+",time:"+createDate;
	}*/
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", nickname=" + nickname
				+ ", email=" + email + ", phone=" + phone 
				+ ", status=" + status + ", createDate=" + createDate + "]";
	}
	
}
