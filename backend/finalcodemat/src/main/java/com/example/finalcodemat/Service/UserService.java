package com.example.finalcodemat.Service;

import com.example.finalcodemat.models.User;

import java.util.List;

public interface UserService {

    boolean isAdmin(Long id);

    List<User> getAllUsers();

    void blockUser(Long id);

    void unblockUser(Long id);
}
