import Layout from '../components/Layout'
import withSession from '../lib/session'
import { User } from '../types/user'

const SsrProfile = ({ user }: { user?: User }) => {
  return (
    <Layout>
      <h1>Your GitHub profile</h1>
      <h2>
        This page uses{' '}
        <a href="https://nextjs.org/docs/basic-features/pages#server-side-rendering">
          Server-side Rendering (SSR)
        </a>{' '}
        and{' '}
        <a href="https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering">
          getServerSideProps
        </a>
      </h2>

      {user?.isLoggedIn && (
        <>
          <p style={{ fontStyle: 'italic' }}>
            Public data, from{' '}
            <a href={githubUrl(user.login)}>{githubUrl(user.login)}</a>, reduced
            to `login` and `avatar_url`.
          </p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </Layout>
  )
}

export const getServerSideProps = withSession(async function ({ req }) {
  const user = req.session.get('user')

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { user: req.session.get('user') }
  }
})

export default SsrProfile

function githubUrl(login: string) {
  return `https://api.github.com/users/${login}`
}
