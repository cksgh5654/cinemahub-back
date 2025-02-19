const {
  updateUserProfile,
  findUserByNickname,
  findUserByEmail,
} = require("../../services/mypage/mypage.service");

// 프로필 조회
const getProfile = async (req, res) => {
  try {
    const { nickname } = req.params;

    const user = await findUserByNickname(nickname);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // 현재 로그인한 유저의 이메일 가져오기
    const loggedInUserEmail = req.session.user.email;

    const loggedInUser = await findUserByEmail(loggedInUserEmail);
    if (!loggedInUser) {
      return res
        .status(404)
        .json({ message: "로그인한 사용자를 찾을 수 없습니다." });
    }
    /* console.log("loggedInUser", loggedInUser);
    console.log("user.nickname", user.nickname); */

    return res.status(200).json({
      ...user,
      isOwnProfile: loggedInUser.nickname === user.nickname, // 프론트에서 바로 활용
    });
  } catch (error) {
    console.error("프로필 조회 오류:", error);
    return res.status(500).json({ message: "서버 오류 발생" });
  }
};

// 프로필 업데이트
const updateProfile = async (req, res) => {
  try {
    const email = req.session.user.email;
    const user = await findUserByEmail(email);

    if (!user) {
      console.error("사용자를 찾을 수 없음");
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const { name, intro, profileImg } = req.body;
    console.log("수정할 데이터", { name, intro, profileImg });

    const updatedUser = await updateUserProfile(user._id, {
      nickname: name,
      introduce: intro,
      profile: profileImg,
    });

    console.log("업데이트된 사용자", updatedUser);

    return res
      .status(200)
      .json({ message: "프로필 업데이트 성공", user: updatedUser });
  } catch (error) {
    console.error("서버 오류 발생:", error);
    return res
      .status(500)
      .json({ message: "서버 오류 발생", error: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
