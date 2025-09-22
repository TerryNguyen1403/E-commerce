import { Dropdown, DropdownButton } from 'react-bootstrap';

const labels = {
  default: 'Mặc định',
  priceAsc: 'Giá: Tăng dần',
  priceDesc: 'Giá: Giảm dần',
};

const SortButton = ({ selectedSort = 'default', onSelect = () => {} }) => {
  return (
    <div className='d-flex justify-content-end me-5'>
      <DropdownButton
        id='dropdown-button-drop-down-centered'
        drop='down-centered'
        variant='light'
        title={`Sắp xếp: ${labels[selectedSort] || labels.default}`}
      >
        <Dropdown.Item onClick={() => onSelect('default')} active={selectedSort === 'default'}>
          {labels.default}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onSelect('priceAsc')} active={selectedSort === 'priceAsc'}>
          {labels.priceAsc}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onSelect('priceDesc')} active={selectedSort === 'priceDesc'}>
          {labels.priceDesc}
        </Dropdown.Item>
      </DropdownButton>
    </div>
  )
}

export default SortButton;