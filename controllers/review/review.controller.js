const checklogin = require('../../middlewares/checklogin');
const { findUserEmailId } = require('../../services/user/user.service');
const {
  createReview,
  findMovieIdCommentsArray,
  findMovieIdStarScoreSum,
} = require('../../services/review/review.service');
const emptyChecker = require('../../utils/emptyChecker');

const reviewController = require('express').Router();

reviewController.post('/register', checklogin, async (req, res) => {
  const { movieId, image, content, starpoint } = req.body;
  const { email } = req.session.user;

  if (emptyChecker({ movieId, image, content, starpoint })) {
    return res
      .status(400)
      .json({ result: false, message: '리뷰 내용 작성과 별점을 등록해주세요' });
  }

  if (!email) {
    return res.status(401).json({
      result: false,
      message: '로그인 유지 시간이 만료되었습니다. 다시 로그인 해주세요.',
    });
  }

  try {
    const _id = await findUserEmailId({ email });

    if (!_id) {
      return res.status(404).json({
        result: false,
        message: '등록된 유저 정보가 없습니다',
      });
    }

    const review = await createReview({
      userId: _id,
      movieId,
      image,
      content,
      starpoint,
    });

    if (!review) {
      throw new Error('리뷰 등록 실패');
    }

    return res.json({
      result: true,
      data: review,
      message: '리뷰가 등록되었습니다.',
    });
  } catch (e) {
    return res.json({
      result: false,
      data: {},
      message: '리뷰 등록에 실패했습니다.',
    });
  }
});

reviewController.post('/totalcomments', async (req, res) => {
  const { movieId } = req.body;

  const reviews = await findMovieIdCommentsArray({ movieId });
  const totalstarpoint = await findMovieIdStarScoreSum({ movieId });

  if (!reviews) {
    throw new Error('전체 리뷰 등록 실패');
  }

  if (!totalstarpoint) {
    throw new Error('별점 조회 실패');
  }

  try {
    return res.json({
      result: true,
      data: { reviews, totalstarpoint: totalstarpoint.toFixed(1) },
      message: '전체 리뷰 조회 성공',
    });
  } catch (e) {
    return res.json({
      result: false,
      message: '전체 리뷰 조회 실패',
    });
  }
});

reviewController.post('/likes', checklogin, async (req, res) => {
  const { commentId, likes } = req.body;
  const { email } = req.session.user;

  if (!email) {
    return res.status(401).json({
      result: false,
      message: '로그인 유지 시간이 만료되었습니다. 다시 로그인 해주세요.',
    });
  }

  if (emptyChecker({ commentId })) {
    return res.status(404).json({
      result: false,
      message: '댓글을 참조할 수 없습니다. 새로고침 해주세요.',
    });
  }

  // const result = await

  try {
    return res.json({
      result: true,
      message: '좋아요 성공',
    });
  } catch (e) {
    return res.json({
      result: false,
      message: '좋아요 실패',
    });
  }
});

module.exports = reviewController;
