'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]')

    const handleClick = (e: Event) => {
      e.preventDefault()
      const link = e.currentTarget as HTMLAnchorElement
      const targetId = link.getAttribute('href')

      if (targetId) {
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }
    }

    links.forEach((link) => {
      link.addEventListener('click', handleClick)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleClick)
      })
    }
  }, [])

  // 섹션이 화면에 들어올 때마다 애니메이션 재생
  useEffect(() => {
    const sections = document.querySelectorAll('section')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 화면에 보일 때 visible 클래스 추가
            entry.target.classList.add(styles.visible)
          } else {
            // 화면에서 벗어나면 visible 클래스 제거
            entry.target.classList.remove(styles.visible)
          }
        })
      },
      { threshold: 0.1 }
    )

    sections.forEach((section) => {
      section.classList.add(styles.hidden)
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  useEffect(() => {
    const scrambleText = (element: HTMLElement, text: string) => {
      let iteration = 0
      const interval = setInterval(() => {
        element.innerText = text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index]
            }
            return String.fromCharCode(Math.floor(Math.random() * 26) + 65) // 랜덤한 문자 (대문자 A-Z)
          })
          .join('')

        if (iteration >= text.length) {
          clearInterval(interval)
        }
        iteration += 1 / 3 // 텍스트가 더 천천히 변하도록 속도 조절
      }, 100) // 50ms마다 업데이트
    }

    const titleElement = document.getElementById('scramble-title')
    if (titleElement) {
      scrambleText(titleElement, '중고 거래 플랫폼')
    }
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0) // 현재 보여줄 프로젝트 목표 인덱스
  const [isPaused, setIsPaused] = useState(false) // 자동 순환 멈춤 상태
  const [isSliding, setIsSliding] = useState(false) // 애니메이션 중인지 여부

  // 프로젝트 목표 데이터
  const projectGoals = [
    {
      title: '강희수',
      description: '프로젝트 전반 제작',
      imageUrl: '/member1.png',
    },
    {
      title: '박대희',
      description: '레이아웃 담당',
      imageUrl: '/member2.png',
    },
    {
      title: '임건희',
      description: '발표 페이지 제작',
      imageUrl: '/member3.png',
    },
    {
      title: '오건우',
      description: '팀소개 페이지 제작',
      imageUrl: 'member4.png',
    },
    {
      title: '최경규',
      description: '연락처 페이지 제작',
      imageUrl: '/member5.png',
    },
    {
      title: '유선빈',
      description: '팀원 페이지 제작',
      imageUrl: '/member6.png',
    },
  ]

  // 다음 프로젝트 목표로 이동
  const handleNext = () => {
    if (isSliding) return
    setIsSliding(true) // 슬라이드 애니메이션 시작
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projectGoals.length)
      setIsSliding(false) // 애니메이션 종료
    }, 500) // 애니메이션 지속 시간과 일치시킴 (0.5초)
  }

  // 이전 프로젝트 목표로 이동
  const handlePrev = () => {
    if (isSliding) return
    setIsSliding(true) // 슬라이드 애니메이션 시작
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + projectGoals.length) % projectGoals.length
      )
      setIsSliding(false) // 애니메이션 종료
    }, 500) // 애니메이션 지속 시간과 일치시킴 (0.5초)
  }

  // 자동 순환 로직 (마우스를 올리면 멈추고, 떼면 재개)
  useEffect(() => {
    if (!isPaused && !isSliding) {
      const interval = setInterval(handleNext, 3000) // 3초 간격으로 자동 전환
      return () => clearInterval(interval) // 컴포넌트 언마운트 시 인터벌 제거
    }
  }, [isPaused, currentIndex, isSliding])

  return (
    <div className={styles.container}>
      <Head>
        <title>팀 프로젝트 소개</title>
        <meta name="description" content="우리 팀의 프로젝트를 소개합니다" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 사이드바 */}
      <nav className={styles.sidebar}>
        <a href="#teamabout">만드려는 웹사이트</a>
        <a href="#project">프로젝트 목표</a>
        <a href="#members">팀원 소개</a>
        <a href="#contact">연락처</a>
        <a href="#top">TOP</a>
      </nav>

      <main className={styles.main}>
        <div id="top" className={styles.emty}></div>
        <h1 className={styles.title}>
          팀 프로젝트: <span id="scramble-title">중고 거래 플랫폼</span>
        </h1>

        <div className={styles.description}>
          -----------------------------------------------------------------------------------------------------------{' '}
        </div>

        {/* 섹션으로 이동하는 버튼들 */}
        <div className={styles.grid}>
          <a href="#teamabout" className={styles.card}>
            <h3>만드려는 웹사이트 &rarr;</h3>
            <p>목표 웹사이트에 대한 설명</p>
            <br></br>
          </a>

          <a href="#project" className={styles.card}>
            <h3>프로젝트 목표 &rarr;</h3>
            <p>해당 프로젝트에서 구현할 목표들</p>
          </a>

          <a href="#members" className={styles.card}>
            <h3>팀원 소개 &rarr;</h3>
            <p>참여 팀원과 역할</p>
          </a>

          <a href="#contact" className={styles.card}>
            <h3>연락처 &rarr;</h3>
            <p>팀원들 연락처와 github 주소</p>
          </a>
        </div>
        <div className={styles.gridbar}></div>

        {/* 섹션들 */}
        <div id="teamabout" className={styles.emty}></div>
        <section className={styles.section}>
          <div className={styles.aboutContent}>
            {' '}
            <img src="/teamabout.jpg" alt="팀 소개" />{' '}
          </div>
          <div className={styles.aboutText}>
            <h2>왜 중고거래인가?</h2>
            <p>
              저희 팀은 Next.js 기반으로 만들 수 있는 풀스택 웹서비스 대한 논의
              끝에 중고 거래 플랫폼이 적합하다고 생각하였습니다. 중고 거래
              플랫폼에는 사용자 인증 및 권한 관리, 검색 및 필터링, 상품 리스트
              관리, 리뷰 및 평점 시스템등 수업시간에 배웠던 요소를 활용하여
              구축할 수 있는 부분이 많고 각 부분은 프론트엔드와 백엔드가
              포함되어있습니다. 또한 이 프로젝트가 마무리되었을 때, 우리학교
              학생들이 유용하게 활용할 수 있도록 중고 거래 플랫폼을 구축하고자
              하였습니다.
            </p>
          </div>
        </section>
        <div id="project" className={styles.emty2}></div>
        <section className={styles.section}>
          <div className={styles.goalText}>
            <h2>프로젝트 목표</h2>
            <h1>1. 사용자 인증 및 관리</h1>
            <p>백엔드 : 사용자 인증을 위한 clerk-Auth이용</p>
            <p>
              프론트 엔드 : 로그인, 회원 가입 폼 구현 및 인증 성공시 특정
              페이지나 기능에 접근 할 수 있도록 함
            </p>
            <h1>2. 상품 리스트 관리</h1>
            <p>
              백엔드 : 상품 데이터를 데이터 베이스에 저장하고, 필요한 상품
              리스트를 클라이언트에 제공하는 API 구축
            </p>
            <p>
              프론트 엔드 : 상품 리스트를 UI에 표시하고, 사용자 요청에 따라
              상품을 필터링하거나 상세 페이지로 이동하는 인터페이스 구현
            </p>
            <h1>3. 검색 및 필터링</h1>
            <p>
              백엔드 : 데이터베이스에서 검색 조건에 부합한 목록 필터링 기능 구현
            </p>
            <p>
              프론트 엔드 : 사용자가 검색 조건을 입력하거나 필터를 선택할 수
              있는 UI제공
            </p>
            <h1>4. 장바구니</h1>
            <p>백엔드 : 사용자가 선택한 상품을 데이터베이스에 저장</p>
            <p>프론트엔드 : 사용자가 선택한 상품을 저장하는 인터페이스 구현</p>
            <h1>5. 리뷰 및 평점</h1>
            <p>
              백엔드 : 사용자들이 리뷰와 평점을 남길 수 있도록 데이터를 저장하고
              관리하는 API 구축
            </p>
            <p>
              프론트 엔드 : 리뷰를 작성하고 평점을 남길 수 있는 폼과 UI를
              제공하고 다른 사용자가 남긴 리뷰와 평점을 보여주는 기능 구현
            </p>
          </div>
          <div className={styles.goalContent}>
            <img src="/goal.png" alt="팀 목표" />
            <img src="/our goal.gif" alt="our goal" />
            <img src="/goal2.png" alt="팀 목표" />
          </div>
        </section>
        <div id="members" className={styles.emty}></div>

        <section
          className={styles.section}
          onMouseEnter={() => setIsPaused(true)} // 마우스를 올렸을 때 자동 순환 정지
          onMouseLeave={() => setIsPaused(false)} // 마우스를 뗐을 때 다시 자동 순환 시작
        >
          <div className={styles.membersContent}>
            <img src="/member.png" alt="팀원 소개" />
          </div>
          <div className={styles.membersText}>
            {' '}
            <h2>팀원 소개</h2>
            <div className={styles.sliderContainer}>
              {/* 이전 버튼 */}
              <button onClick={handlePrev} className={styles.arrow}>
                &#9664; {/* 왼쪽 화살표 */}
              </button>

              {/* 슬라이드 애니메이션이 적용된 현재 보여줄 프로젝트 목표 */}
              <div
                className={`${styles.projectGoal} ${
                  isSliding ? styles.sliding : ''
                }`}
              >
                <h1>{projectGoals[currentIndex].title}</h1>
                <p>{projectGoals[currentIndex].description}</p>
                <img
                  src={projectGoals[currentIndex].imageUrl}
                  alt={projectGoals[currentIndex].title}
                  className={styles.goalImage}
                />
              </div>

              {/* 다음 버튼 */}
              <button onClick={handleNext} className={styles.arrow}>
                &#9654; {/* 오른쪽 화살표 */}
              </button>
            </div>
          </div>
        </section>
        <div id="contact" className={styles.emty}></div>
        <section className={styles.section}>
          <div className={styles.contactText}>
            <h2>연락처</h2>
            <p>
              <span className={styles.spanname}>강희수</span> 010-8596-7633{' '}
              <a
                href="https://github.com/persipica"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <img
                  src="/github-icon.png"
                  alt="GitHub"
                  className={styles.githubIcon}
                />{' '}
              </a>
            </p>
            <p>
              <span className={styles.spanname}>임건희</span> 010-9811-4297
              <a
                href="https://github.com/limgunny"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <img
                  src="/github-icon.png"
                  alt="GitHub"
                  className={styles.githubIcon}
                />{' '}
              </a>
            </p>
            <p>
              <span className={styles.spanname}>박대희</span> 010-5347-0582{' '}
              <a
                href="https://github.com/parkdaihee"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <img
                  src="/github-icon.png"
                  alt="GitHub"
                  className={styles.githubIcon}
                />{' '}
              </a>
            </p>
            <p>
              <span className={styles.spanname}>최경규</span> 010-4129-7399
              <a
                href="https://github.com/rudrb"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <img
                  src="/github-icon.png"
                  alt="GitHub"
                  className={styles.githubIcon}
                />{' '}
              </a>
            </p>
            <p>
              <span className={styles.spanname}>오건우</span> 010-9305-5278{' '}
              <a
                href="https://github.com/BigWales98"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <img
                  src="/github-icon.png"
                  alt="GitHub"
                  className={styles.githubIcon}
                />{' '}
              </a>
            </p>
            <p>
              <span className={styles.spanname}>유선빈</span> 010-8272-5131
              <a
                href="https://github.com/Rickyphantom"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <img
                  src="/github-icon.png"
                  alt="GitHub"
                  className={styles.githubIcon}
                />{' '}
              </a>
            </p>
          </div>
          <div className={styles.contactContent}>
            <img src="/contact.png" alt="contact" />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        © teamProject. All rights reserved.
      </footer>
    </div>
  )
}
