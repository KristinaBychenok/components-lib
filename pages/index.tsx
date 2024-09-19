import { DynamicInput } from '../components/dynamic-input/dynamic-input'
import { Header } from '../components/header/header'
import { Wrapper } from '../components/layout/wrapper'
import { ComponentsWrapper } from '../components/layout/componentsWrapper'

const listOfTags: string[] = [
  'React',
  'Redux',
  'Next.js',
  'Tailwind',
  'JavaScript',
  'CSS',
  'Node.js',
  'Jest',
]

// Add here new components data
const componentsLib = [
  {
    id: '1',
    name: 'Dynamic Input',
    component: <DynamicInput listOfTags={listOfTags} />,
  },
]

export default function Home() {
  return (
    <Wrapper>
      <Header />
      {componentsLib.map((component) => (
        <ComponentsWrapper key={component.id} name={component.name}>
          {component.component}
        </ComponentsWrapper>
      ))}
    </Wrapper>
  )
}
