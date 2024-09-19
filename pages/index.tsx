import { DynamicInput } from '../components/dynamic-input/dynamic-input'
import { Header } from '../components/header/header'
import { Wrapper } from '../components/layout/wrapper'
import { ComponentsWrapper } from '../components/layout/componentsWrapper'

// Add here new components data
const componentsLib = [
  {
    id: '1',
    name: 'Dynamic Input',
    component: <DynamicInput />,
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
