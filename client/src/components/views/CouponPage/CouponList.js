import React from 'react';

function Coupon({ coupon, onRemove }) {
    return (
      <div>
          <ui>
              <li><b>{coupon.couponname}</b><button onClick={() => onRemove(coupon.id)}>삭제</button></li>
              
          </ui>
        
      </div>
    );
  }

  function CouponList({ coupons, onRemove }) {
    return (
      <div>
        {coupons.map(coupon => (
          <Coupon coupon={coupon} key={coupon.id}  onRemove={onRemove}/>
        ))}
      </div>
    );
  }

  export default CouponList;