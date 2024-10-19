'use client'

import { useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]')

    // 이벤트 리스너 콜백 함수를 변수로 정의
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
        // 동일한 콜백을 사용해 이벤트 리스너 제거
        link.removeEventListener('click', handleClick)
      })
    }
  }, [])

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
          팀 프로젝트: <span>중고 거래 플랫폼</span>
        </h1>

        <p className={styles.description}>
          이 페이지는 우리 팀의 프로젝트를 소개하는 웹페이지입니다.
        </p>

        {/* 섹션으로 이동하는 버튼들 */}
        <div className={styles.grid}>
          <a href="#teamabout" className={styles.card}>
            <h3>만드려는 웹사이트 &rarr;</h3>
            <p>목표 웹사이트에 대한 설명</p>
            <br></br>
          </a>

          <a href="#project" className={styles.card}>
            <h3>프로젝트 목표 &rarr;</h3>
            <p>해당 프로젝트의 목적과 사용기술</p>
          </a>

          <a href="#members" className={styles.card}>
            <h3>팀원 소개 &rarr;</h3>
            <p>참여 팀원과 역할</p>
          </a>

          <a href="#contact" className={styles.card}>
            <h3>연락처 &rarr;</h3>
            <p>문의 사항이 있으시면 연락해 주세요.</p>
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
            <h2>만들고자 하는 웹사이트</h2>
            <p>
              교내 중고거래 플랫폼은 학생들이 사용하지 않는 중고 물품을 쉽고
              안전하게 거래할 수 있는 공간의 제공 및 물품의 효율적 재사용을 위해
              기획되었으며 이로써 학생들의 경제적 부담뿐만 아니라 자원의 낭비를
              줄이고, 환경 보호에 기여할 수 있다는 기대하에 기획되었습니다.
            </p>
          </div>
        </section>
        <div id="project" className={styles.emty}></div>

        <section className={styles.section}>
          <div className={styles.goalText}>
            <h2>프로젝트 목표</h2>
            <p>
              DB Mongo DB를 통해서 중고 거래 물품을 등록 및 삭제할 수 있도록
              구현할 예정 Server Netlify의 도메인 및 서버를 활용하여 웹사이트
              배포 Back-end/Front-end Next Js 기반으로 Back-end 및 Front-end를
              제작하며 추가적으로 Tailwind CSS 프레임워크를 활용할 예정
            </p>
          </div>
          <div className={styles.goalContent}>
            <img src="/goal.png" alt="팀 목표" />
          </div>
        </section>
        <div id="members" className={styles.emty}></div>

        <section className={styles.section}>
          <div className={styles.membersContent}>
            <img src="/member.png" alt="팀원 소개" />
          </div>
          <div className={styles.membersText}>
            {' '}
            <h2>팀원 소개</h2>
            <p>
              강희수 학번 : 91913127 https://github.com/persipica 팀내역할 :
            </p>
            <p>팀내역할 : 프로젝트 구상 및 프로젝트 제작에 전반적으로 기여</p>
            <p>박대희 학번 : 92114481 https://github.com/parkdaihee</p>
            <p>팀내역할 : 페이지에 적용되는 레이아웃 파트 담당</p>
            <p>오건우 학번 : 91714131 https://github.com/BigWales98</p>
            <p>팀내역할 : 팀 소개 페이지 제작</p>
            <p>유선빈 학번 : 92113724 https://github.com/Rickyphantom</p>
            <p>팀원 소개 페이지 제작</p>
            <p>임건희 학번 : 91814333 https://github.com/limgunny</p>
            <p>팀내역할 : 프로젝트 발표 페이지 제작</p>
            <p>최경규 학번 : 92015489 https://github.com/rudrb </p>
            <p>팀내역할 : 연락처 페이지 제작</p>
          </div>
        </section>
        <div id="contact" className={styles.emty}></div>
        <section className={styles.section}>
          <div className={styles.contactText}>
            <h2>연락처</h2>
            <p>
              <span className={styles.spanname}>강희수</span> 010-8596-7633{' '}
              <span className={styles.spanname}>임건희</span> 010-9811-4297
            </p>
            <p>
              <span className={styles.spanname}>박대희</span> 010-5347-0582{' '}
              <span className={styles.spanname}>최경규</span> 010-4129-7399
            </p>
            <p>
              <span className={styles.spanname}>오건우</span> 010-9305-5278{' '}
              <span className={styles.spanname}>유선빈</span> 010-8272-5131
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
